<?php
// ═══════════════════════════════════════════════════════
//  ENCANTADA — LEADS REST API
//  Adicionado ao final de: wp-content/themes/hello-elementor/functions.php
//
//  O que faz:
//    - Registra CPT 'encantada_lead' (WP Admin → Leads)
//    - Endpoint: POST /wp-json/encantada/v1/lead
//    - Salva todos os campos como post meta
//    - Envia e-mail de notificação ao admin
//    - Meta box com todos os dados formatados
//    - Colunas customizadas na listagem
//
//  Como aplicar:
//    Cole este conteúdo (sem a tag <?php inicial) ao final do
//    arquivo wp-content/themes/hello-elementor/functions.php
//
//  Versão: 1.0 — 09/06/2026
// ═══════════════════════════════════════════════════════

if ( ! function_exists('encantada_register_lead_cpt') ) :

// 1. Custom Post Type ─────────────────────────────────────
function encantada_register_lead_cpt() {
    register_post_type( 'encantada_lead', array(
        'labels' => array(
            'name'          => 'Leads',
            'singular_name' => 'Lead',
            'menu_name'     => 'Leads',
            'all_items'     => 'Todos os Leads',
        ),
        'public'        => false,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => array('title'),
        'show_in_rest'  => false,
        'menu_position' => 5,
    ) );
}
add_action( 'init', 'encantada_register_lead_cpt' );

// 2. Endpoint REST ────────────────────────────────────────
add_action( 'rest_api_init', function () {
    register_rest_route( 'encantada/v1', '/lead', array(
        'methods'             => 'POST',
        'callback'            => 'encantada_save_lead',
        'permission_callback' => '__return_true',
    ) );
} );

function encantada_save_lead( WP_REST_Request $req ) {
    $data = $req->get_json_params();
    if ( empty( $data ) ) { $data = $req->get_params(); }

    $nome     = sanitize_text_field( isset($data['nome'])        ? $data['nome']        : '' );
    $cargo    = sanitize_text_field( isset($data['cargo'])       ? $data['cargo']       : '' );
    $email    = sanitize_email(      isset($data['email'])       ? $data['email']       : '' );
    $whatsapp = sanitize_text_field( isset($data['whatsapp'])    ? $data['whatsapp']    : '' );
    $empresa  = sanitize_text_field( isset($data['empresa'])     ? $data['empresa']     : '' );
    $fat      = sanitize_text_field( isset($data['faturamento']) ? $data['faturamento'] : '' );
    $setor    = sanitize_text_field( isset($data['setor'])       ? $data['setor']       : '' );
    $gargalo  = sanitize_text_field( isset($data['gargalo'])     ? $data['gargalo']     : '' );
    $contexto = sanitize_textarea_field( isset($data['contexto']) ? $data['contexto']   : '' );

    if ( empty($nome) || empty($email) || empty($whatsapp) ) {
        return new WP_REST_Response( array('success' => false, 'message' => 'Campos obrigatorios ausentes.'), 400 );
    }

    $post_id = wp_insert_post( array(
        'post_type'   => 'encantada_lead',
        'post_title'  => $nome . ' — ' . $empresa,
        'post_status' => 'publish',
        'meta_input'  => array(
            '_lead_nome'        => $nome,
            '_lead_cargo'       => $cargo,
            '_lead_email'       => $email,
            '_lead_whatsapp'    => $whatsapp,
            '_lead_empresa'     => $empresa,
            '_lead_faturamento' => $fat,
            '_lead_setor'       => $setor,
            '_lead_gargalo'     => $gargalo,
            '_lead_contexto'    => $contexto,
            '_lead_data'        => current_time('d/m/Y H:i'),
            '_lead_origem'      => sanitize_text_field( isset($data['origem']) ? $data['origem'] : 'landing-page' ),
        ),
    ) );

    if ( is_wp_error($post_id) ) {
        return new WP_REST_Response( array('success' => false, 'message' => 'Erro ao salvar.'), 500 );
    }

    // E-mail de notificação
    $to      = get_option('admin_email');
    $subject = 'Novo Lead: ' . $nome . ' (' . $empresa . ')';
    $body    = "NOVO LEAD RECEBIDO\n\n"
             . "Nome: "        . $nome     . "\n"
             . "Cargo: "       . $cargo    . "\n"
             . "E-mail: "      . $email    . "\n"
             . "WhatsApp: "    . $whatsapp . "\n"
             . "Empresa: "     . $empresa  . "\n"
             . "Faturamento: " . $fat      . "\n"
             . "Setor: "       . $setor    . "\n"
             . "Gargalo: "     . $gargalo  . "\n"
             . "Contexto: "    . $contexto . "\n\n"
             . "Data: "        . current_time('d/m/Y H:i') . "\n"
             . "Ver leads: "   . admin_url('edit.php?post_type=encantada_lead');
    wp_mail( $to, $subject, $body );

    return new WP_REST_Response( array('success' => true, 'id' => $post_id), 200 );
}

// 3. Meta box — dados do lead ─────────────────────────────
add_action( 'add_meta_boxes', function () {
    add_meta_box(
        'encantada_lead_data',
        'Dados do Lead',
        'encantada_lead_meta_box_render',
        'encantada_lead',
        'normal',
        'high'
    );
} );

function encantada_lead_meta_box_render( $post ) {
    $fields = array(
        '_lead_nome'        => 'Nome',
        '_lead_cargo'       => 'Cargo',
        '_lead_email'       => 'E-mail',
        '_lead_whatsapp'    => 'WhatsApp',
        '_lead_empresa'     => 'Empresa',
        '_lead_faturamento' => 'Faturamento',
        '_lead_setor'       => 'Setor',
        '_lead_gargalo'     => 'Gargalo',
        '_lead_contexto'    => 'Contexto',
        '_lead_data'        => 'Data',
        '_lead_origem'      => 'Origem',
    );
    echo '<table style="width:100%;border-collapse:collapse;font-size:13px">';
    foreach ( $fields as $key => $label ) {
        $val = get_post_meta( $post->ID, $key, true );
        if ( $val !== '' ) {
            echo '<tr><th style="text-align:left;padding:6px 10px;background:#f9f9f9;width:110px;border:1px solid #ddd;font-weight:600">' . esc_html($label) . '</th>';
            echo '<td style="padding:6px 10px;border:1px solid #ddd">' . nl2br(esc_html($val)) . '</td></tr>';
        }
    }
    echo '</table>';
}

// 4. Colunas na listagem de leads ─────────────────────────
add_filter( 'manage_encantada_lead_posts_columns', function ( $cols ) {
    return array(
        'cb'            => isset($cols['cb']) ? $cols['cb'] : '',
        'title'         => 'Nome / Empresa',
        'lead_email'    => 'E-mail',
        'lead_whatsapp' => 'WhatsApp',
        'lead_gargalo'  => 'Gargalo',
        'lead_data'     => 'Data',
    );
} );

add_action( 'manage_encantada_lead_posts_custom_column', function ( $col, $post_id ) {
    $map = array(
        'lead_email'    => '_lead_email',
        'lead_whatsapp' => '_lead_whatsapp',
        'lead_gargalo'  => '_lead_gargalo',
        'lead_data'     => '_lead_data',
    );
    if ( isset($map[$col]) ) {
        echo esc_html( get_post_meta($post_id, $map[$col], true) );
    }
}, 10, 2 );

endif;
