$(document).ready(function () {
    // MODAL
    var modalText = {
        pokerogue: {
            title: 'PokéRogue',
            detail:
                'PokéRogue is an unofficial, open-source web game based on the popular video game series - Pokémon. I have contributed ideas and made bug fixes while working with other developers to improve the game.',
            link: 'https://pokerogue.net/'
        },
        realife: {
            title: 'Realife Clothing',
            detail:
                'Reworked the design and layout of Realife Clothings website for a smoother user experience. Still ongoing working on the project with any new changes that are requested.',
            link: 'https://realifeclothing.com/'
        },
        checkin: {
            title: '.NET Check In System',
            detail:
                'A simple project that demonstrates a check in system written in C# .NET. A collaborative project that features authentication/authorisation, CRUD operations on a database, as well as a few other interesting features.',
            link: 'https://github.com/blakethorne5112/DotNet-User-Check-In'
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
