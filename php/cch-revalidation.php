<?php
/**
 * Plugin Name: CCH Next.js Revalidate
 * Description: Refreshes the live Next.js site whenever content changes. Set the site URL and key under CCH Revalidate in the admin sidebar.
 * Version: 1.2.1
 * Author: CCH Investments
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CCHR_OPTION', 'cchr_secret');
define('CCHR_URL_OPTION', 'cchr_site_url');

function cchr_send($blocking = false) {
    $secret = get_option(CCHR_OPTION, '');
    $site   = untrailingslashit(get_option(CCHR_URL_OPTION, ''));
    if ($secret === '' || $site === '') {
        return null;
    }

    return wp_remote_post($site . '/api/revalidate', array(
        'headers'  => array('x-revalidate-secret' => $secret),
        'timeout'  => 10,
        'blocking' => $blocking,
    ));
}

function cchr_on_change($post_id) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    $types = array('portfolio', 'post', 'attachment');
    if (!in_array(get_post_type($post_id), $types, true)) {
        return;
    }

    cchr_send(false);
}

// Runs after ACF saves its fields, so the site gets the new values.
add_action('acf/save_post', 'cchr_on_change', 20);
add_action('save_post', 'cchr_on_change', 99);
add_action('trashed_post', 'cchr_on_change');
add_action('deleted_post', 'cchr_on_change');

// Settings page: Settings → CCH Revalidate
function cchr_register_settings() {
    register_setting('cchr', CCHR_OPTION, array(
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default'           => '',
    ));
    register_setting('cchr', CCHR_URL_OPTION, array(
        'type'              => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default'           => '',
    ));
}
add_action('admin_init', 'cchr_register_settings');

// Own item in the admin sidebar: CCH Revalidate
function cchr_add_menu() {
    add_menu_page('CCH Revalidate', 'CCH Revalidate', 'manage_options', 'cchr', 'cchr_render_page', 'dashicons-update', 81);
}
add_action('admin_menu', 'cchr_add_menu');

// "Settings" link under the plugin name on the Plugins page
function cchr_action_links($links) {
    array_unshift($links, '<a href="' . esc_url(admin_url('admin.php?page=cchr')) . '">Settings</a>');
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'cchr_action_links');

function cchr_render_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $result_message = '';
    if (isset($_POST['cchr_test']) && check_admin_referer('cchr_test')) {
        $response = cchr_send(true);
        if ($response === null) {
            $result_message = 'Save both the site URL and the key first.';
        } elseif (is_wp_error($response)) {
            $result_message = 'Request failed: ' . $response->get_error_message();
        } else {
            $code = wp_remote_retrieve_response_code($response);
            $body = wp_remote_retrieve_body($response);
            $result_message = 'Site responded ' . $code . ': ' . substr(wp_strip_all_tags($body), 0, 300);
        }
    }
    ?>
    <div class="wrap">
        <h1>CCH Revalidate</h1>
        <p>Site URL: the address where the Next.js site is live (e.g. <code>https://your-project.vercel.app</code>), no trailing path.<br />
        Key: the same value saved as <code>REVALIDATE_SECRET</code> in Vercel.</p>
        <form method="post" action="options.php">
            <?php settings_fields('cchr'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="cchr_site_url">Site URL</label></th>
                    <td>
                        <input type="url" id="cchr_site_url" name="<?php echo esc_attr(CCHR_URL_OPTION); ?>"
                               value="<?php echo esc_attr(get_option(CCHR_URL_OPTION, '')); ?>" class="regular-text"
                               placeholder="https://your-project.vercel.app" />
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="cchr_secret">Key</label></th>
                    <td>
                        <input type="password" id="cchr_secret" name="<?php echo esc_attr(CCHR_OPTION); ?>"
                               value="<?php echo esc_attr(get_option(CCHR_OPTION, '')); ?>" class="regular-text" />
                    </td>
                </tr>
            </table>
            <?php submit_button('Save settings'); ?>
        </form>

        <hr />
        <h2>Test</h2>
        <p>Sends a refresh to the live site. Expect <code>200</code> with <code>"revalidated":true</code>.</p>
        <form method="post">
            <?php wp_nonce_field('cchr_test'); ?>
            <input type="hidden" name="cchr_test" value="1" />
            <?php submit_button('Send test refresh', 'secondary'); ?>
        </form>
        <?php if ($result_message !== '') : ?>
            <p><strong><?php echo esc_html($result_message); ?></strong></p>
        <?php endif; ?>
    </div>
    <?php
}
