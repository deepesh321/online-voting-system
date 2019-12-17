function expand_organiser() {
    document.getElementById('organiser_div').classList.remove('col-xl');
    document.getElementById('organiser_div').classList.add('col-xl-9');
    document.getElementById('voter_div').classList.remove('col-xl');
    document.getElementById('voter_div').classList.add('col-xl-3');
    document.getElementById('org_icn').style.backgroundColor = '#008B8B';
    document.getElementById('org_icn').style.cursor = 'default';
    document.getElementById('organiser_link_align').style.cssFloat = 'left';
    document.getElementById('org_desc').style.display = 'block';
    document.getElementById('organiser').style.display = 'none';
    document.getElementById('organiser_link').style.display = 'block';
}

function contract_organiser() {
    document.getElementById('organiser_div').classList.remove('col-xl-9');
    document.getElementById('organiser_div').classList.add('col-xl');
    document.getElementById('voter_div').classList.remove('col-xl-3');
    document.getElementById('voter_div').classList.add('col-xl');
    document.getElementById('org_icn').style.background = 'none';
    document.getElementById('org_icn').style.cursor = 'default';
    document.getElementById('organiser_link_align').style.cssFloat = 'none';
    document.getElementById('org_desc').style.display = 'none';
    document.getElementById('organiser').style.display = 'block';
    document.getElementById('organiser_link').style.display = 'none';
}

function expand_voter() {
    document.getElementById('organiser_div').classList.remove('col-xl');
    document.getElementById('organiser_div').classList.add('col-xl-3');
    document.getElementById('voter_div').classList.remove('col-xl');
    document.getElementById('voter_div').classList.add('col-xl-9');
    document.getElementById('vtr_icn').style.backgroundColor = '#008B8B';
    document.getElementById('vtr_icn').style.cursor = 'default';
    document.getElementById('voter_link_align').style.cssFloat = 'left';
    document.getElementById('vtr_desc').style.display = 'block';
    document.getElementById('voter').style.display = 'none';
    document.getElementById('voter_link').style.display = 'block';
}

function contract_voter() {
    document.getElementById('voter_div').classList.remove('col-xl-9');
    document.getElementById('voter_div').classList.add('col-xl');
    document.getElementById('organiser_div').classList.remove('col-xl-3');
    document.getElementById('organiser_div').classList.add('col-xl');
    document.getElementById('vtr_icn').style.background = 'none';
    document.getElementById('vtr_icn').style.cursor = 'default';
    document.getElementById('voter_link_align').style.cssFloat = 'none';
    document.getElementById('vtr_desc').style.display = 'none';
    document.getElementById('voter').style.display = 'block';
    document.getElementById('voter_link').style.display = 'none';
}

function nav_bar_background() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("nav_bar").style.backgroundColor = '#008B8B';
        document.getElementById("nav_bar").style.borderBottom = 'none';
        document.getElementById("nav_bar_div").style.top = '0';
    } else {
        document.getElementById("nav_bar").style.background = 'transparent';
        document.getElementById("nav_bar").style.borderBottom = '0.5px solid dimgray';
        document.getElementById("nav_bar_div").style.top = '-69px';
    }
}

function menu_bar_open_display() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById('menu_bar_display_open').style.left = '0';
    } else {
        document.getElementById('menu_bar_display_open').style.left = '-1.2%';
    }
}

function animate_details() {
   var scroll_top = $('.section').offset().top();
    if (document.body.scrollTop >= scroll_top) {
        document.getElementById('details_heading').style.left = '0';
    } else {
        document.getElementById('menu_bar_display_open').style.left = '-1.2%';
    }
}
