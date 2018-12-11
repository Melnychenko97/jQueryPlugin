var input = $('input[type = text]');
input.wrap('<span class="text-wrapper"></span>');
var textarea = $('textarea');
textarea.wrap('<span class="textarea-wrapper"></span>');

function cssPropertiesDelegation(target, position) {

    target.each(function (index, element) {
        var elementMargin = $(element).css('margin');
        var elementDisplay = $(element).css('display');
        $(element).parent().css({
            'margin': elementMargin,
            'display': elementDisplay
        });
        $(element).css({
            'margin': '0',
            'display': 'inline-block'
        });
        if (element.tagName === 'TEXTAREA') { // special position for 'x' due to textarea overflow property
            var elementHeight = parseInt($(element).css('height')) - 20;
            $(element).next().css('transform', 'translateY(-' + elementHeight + 'px) translateX(-35px)');
            $(element).prev().css('transform', 'translateY(-' + elementHeight + 'px) translateX(+35px)');
            $(element).removeClass(position.position + '-side-button');
            $(element).addClass(position.position + '-side-button-textarea');
        }
        if ($(element).val()) { // if value of tag is not empty - show cross
            $(element).siblings().addClass('active-button');
            $(element).parent().addClass('active-wrapper-' + position.position);
        }
    });
}

$.fn.setClearButton = function (userPosition) { // method for clearing buttons
    var defaultPosition = {
        'position': 'right'
    };
    var resultPosition = $.extend(defaultPosition, userPosition);
    var button = $('<button class="clear" tabindex="-1">x</button>');
    $(this).addClass(resultPosition.position + '-side-button');

    if (resultPosition.position === 'right') {
        button.insertAfter(this); // button inserts after input
        $(this).next().addClass('right'); // position of button

    } else {
        button.insertBefore(this);
        $(this).prev().addClass('left');
    }
    cssPropertiesDelegation(this, resultPosition);

    $('.clear').on('click', function (event) { // clear a target field on cross click and also hide cross
        $(event.target).siblings().val('').focus();
        $(event.target).removeClass('active-button');
        $(event.target).parent().removeClass('active-wrapper-' + resultPosition.position);

    });

    $(this).on('input', function (event) { // if something in area- shows button
        var currentButton = $(event.target).siblings();
        var currentWrapper = $(event.target).parent();

        if ($(event.target).val()) {
            currentButton.addClass('active-button');
            currentWrapper.addClass('active-wrapper-' + resultPosition.position);
        } else { // if not - not
            currentButton.removeClass('active-button');
            currentWrapper.removeClass('active-wrapper-' + resultPosition.position);
        }
    });
};

$('input').setClearButton({
    'position': 'right'
});
$('textarea').setClearButton({
    'position': 'left'
});
