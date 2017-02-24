/* activate scrollspy menu */
$('body').scrollspy({
    target: '#navbar-collapsible',
    offset: 52
});

/* Fechar menu navbar-collapse */
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});
