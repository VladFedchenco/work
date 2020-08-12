var params = {
  'magnify': {
    left_position: 724, // object left position, px
    top_position: 67, // object top position, px
    width: 160, // object width, px
    height: 90, // object height, px
    is_circle: true, // shape of the magnify, circle or rectangle, boolean
    border_radius: 8, // border radius of the rectangle magnify, px
    border_width: 3, // border width of the magnify, px
    border_color: '#fff', // bborder color, hex
    color_overlay: 'rgba(255, 255, 255, .3)' // color overlay of the magnify, rgba
  },
  'animation': {
    scale_start: 0, // initial scale of the magnify
    scale_mid: 1.6, // mid scale  of the magnify
    scale_end: 0, // final scale of the magnify
    opacity_start: 0, // opacity at the beginning
    opacity_mid: 1, // opacity when moving
    opacity_end: 0, // opacity at the end
    point_a_x: 300, // x coordinate of the first point
    point_a_y: 200, // y coordinate of the first point
    point_b_x: 604, // x coordinate of the second point
    point_b_y: 500, // y coordinate of the secont point
    point_c_x: 1000, // x coordinate of the third point
    point_c_y: 200, // y coordinate of the third point
    total_time: 3, // overall animation time
    appearance_time: 10, // appearance time, percent of total_time, %
    disappearance_time: 10 // disappearance time, percent of total_time, %
  }
}

if(params.magnify.is_circle) {
    if(params.magnify.width > params.magnify.height) {
        params.magnify.height = params.magnify.width;
    } else {
        params.magnify.width = params.magnify.height;
    }
    params.magnify.border_radius = params.magnify.width/2;
}

var main_css_upd = `
* {
  box-sizing: border-box;
}
*:focus {
  outline: none;
}
html, body {
    margin: 0;
    padding: 0;
}
#magnify {
    position: absolute;
    left: ${params.magnify.left_position}px;
    top: ${params.magnify.top_position}px;
    width: ${params.magnify.width}px;
    height: ${params.magnify.height}px;
    border: solid ${params.magnify.border_width}px ${params.magnify.border_color};
    border-radius: ${params.magnify.border_radius}px;
    background: url(imgs/img1.jpg) no-repeat -${params.animation.point_a_x}px -${params.animation.point_a_y}px;
    animation: magnify_animation ${params.animation.total_time}s linear forwards;
}
#magnify:after {
    content: '';
    display: block;
    position: absolute;
    left: -${params.magnify.border_width}px;
    top: -${params.magnify.border_width}px;
    width: ${params.magnify.width}px;
    height: ${params.magnify.height}px;
    background-color: ${params.magnify.color_overlay};
    border-radius: ${params.magnify.border_radius}px;
}
@keyframes magnify_animation {
    ${params.animation.appearance_time}%, ${100 - params.animation.disappearance_time}% {
        opacity: ${params.animation.opacity_mid};
        transform: scale(${params.animation.scale_mid});
    }
    0% {
        left: ${params.animation.point_a_x}px;
        top: ${params.animation.point_a_y}px;
        opacity: ${params.animation.opacity_start};
        background-position: -${params.animation.point_a_x}px -${params.animation.point_a_y}px;
        transform: scale(${params.animation.scale_start});
    }
    50% {
        left: ${params.animation.point_b_x}px;
        top: ${params.animation.point_b_y}px;
        background-position: -${params.animation.point_b_x}px -${params.animation.point_b_y}px;
    }
    100% {
        left: ${params.animation.point_c_x}px;
        top: ${params.animation.point_c_y}px;
        opacity: ${params.animation.opacity_end};
        background-position: -${params.animation.point_c_x}px -${params.animation.point_c_y}px;
        transform: scale(${params.animation.scale_end});
    }
}
`

function $(sel) {
    return document.querySelector(sel);
}

$("#main_css").innerHTML = main_css_upd;