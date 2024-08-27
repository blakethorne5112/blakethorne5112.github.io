$(document).ready(function () {
    // MODAL
    var modalText = {
        scrollproject: {
            title: 'PokéRogue',
            detail:
                'PokéRogue is an unofficial, open-source web game based on the popular video game series - Pokémon. I have contributed ideas and made bug fixes while working with other developers to improve the game.',
            link: 'https://pokerogue.net/'
        },
        rotatenav: {
            title: 'Realife Clothing',
            detail:
                'Reworked the design and layout of Realife Clothings website for a smoother user experience. Still ongoing working on the project with any new changes that are requested.',
            link: 'https://realifeclothing.com/'
        },
        inputwave: {
            title: 'Login Input Wave',
            detail:
                'This site features a simple project where clicking into the entry fields shows a little animation for the field titles.',
            link: 'https://htmlpreview.github.io/?https://github.com/blakethorne5112/Login-Input-Wave/blob/main/index.html'
        },
        animbox: {
            title: 'Animated 3D Boxes',
            detail:
                'This site features a cool project where pressing the Magic button will toggle joining and separating boxes that display a gif.',
            link: 'https://htmlpreview.github.io/?https://github.com/blakethorne5112/Animated-3d-Boxes/blob/main/index.html'
        },
        cpplogin: {
            title: 'Simple Login System',
            detail:
                'A small login system coded in C++ that allows you to create an account and successfully login with it. The system is able to detect whether an account previously existed or not, and is able to verify correct login details.',
            link: 'https://github.com/blakethorne5112/LoginSystem'
        },
        tdunity: {
            title: 'Tower Defence Game',
            detail:
                'A collaboratively coded Tower Defence game, coded in C# using Unity.',
            link: 'https://github.com/blakethorne5112/UnityPlatformGame'
        },
        git: {
            title: 'Projects currently in progress',
            detail:
                'Please feel free to have a look at my GitHub page for any new projects I might be working on right now!',
            link: 'https://github.com/blakethorne5112/'
        },
    };

    $('#gallery .button').on('click', function () {
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
    });

    $('.close').on('click', function () {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    $('.mask').on('click', function () {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

    setDimensions();

    $('#next').click(function () {
        shiftSlide(-1);
    });
    $('#prev').click(function () {
        shiftSlide(1);
    });

    carousel.on('mousedown', function () {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function () {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)');
        });
        $(document).on('mouseup', function () {
            if (dragPos() > threshold) {
                return shiftSlide(1);
            }
            if (dragPos() < -threshold) {
                return shiftSlide(-1);
            }
            shiftSlide(0);
        });
    });

    function setDimensions() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1);
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup');
        carousel
            .off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + direction * slideWidth + 'px)');
        setTimeout(function () {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'));
            }
            carousel.removeClass('transition');
            carousel.css('transform', 'translateX(0px)');
        }, 700);
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link)
            $('#modal .button')
                .addClass('visible')
                .parent()
                .attr('href', modalText[id].link);

        $.each($('#modal li'), function (index, value) {
            $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function (index, value) {
            $(this).css({
                background:
                    "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
                backgroundSize: 'cover'
            });
        });
    }
});
