var default_magnifier = {
    'width': 100,
    'height': 100,
    'is_circle': false,
    'border_radius': 8,
    'border_width': 3,
    'border_color': '#fff',
    'color_overlay': 'rgba(255, 255, 0, .15)',
    'continuos': false, // switch between two types of zooming
    'total_time': 5,
    'zoom': 2
}

var magnifiers = [
    {
        'left_position': 300,
        'top_position': 54,
        'width': 408,
        'height': 298,
        'is_circle': true,
        'border_radius': 8,
        'border_width': 3,
        'border_color': '#fff',
        'color_overlay': 'rgba(255, 255, 0, .15)',
        'animation_time': 1
    },
    {
        'left_position': 724,
        'top_position': 67,
        'width': 360,
        'height': 515,
        'is_circle': false,
        'border_radius': 8,
        'border_width': 3,
        'border_color': '#fff',
        'color_overlay': 'rgba(255, 255, 0, .15)',
        'animation_time': 1
    },
    {
        'left_position': 1228,
        'top_position': 315,
        'width': 155,
        'height': 152,
        'is_circle': true,
        'border_radius': 8,
        'border_width': 3,
        'border_color': '#fff',
        'color_overlay': 'rgba(255, 255, 0, .15)',
        'animation_time': 1
    }
]

var magnifiers_css = '';

magnifiers.forEach(function (item, index) {
  if(magnifiers[index].is_circle) {
    if(magnifiers[index].width > magnifiers[index].height) {
        magnifiers[index].height = magnifiers[index].width;
    } else {
        magnifiers[index].width = magnifiers[index].height;
    }
    magnifiers[index].border_radius = magnifiers[index].width/2;
    }
});

if(default_magnifier.continuos) {
    let node = document.createElement("div");
    node.setAttribute('id', 'magnifier');
    $("#top_mask").appendChild(node);

    magnifiers_css = `#magnifier {
    position: absolute;
    top: ${magnifiers[0].top_position + magnifiers[0].height / 2}px;
    left: ${magnifiers[0].left_position + magnifiers[0].width / 2}px;
    width: ${default_magnifier.width}px;
    height: ${default_magnifier.height}px;
    transform: translate(-50%, -50%);
    border-radius: ${default_magnifier.border_radius}px;
    overflow: hidden;
    opacity: 0;
    border: solid ${default_magnifier.border_width}px ${default_magnifier.border_color};
    background: url(${$("#object_img").getAttribute('src')}) no-repeat -${magnifiers[0].left_position + magnifiers[0].width / 2 - default_magnifier.width / 2}px -${magnifiers[0].top_position + magnifiers[0].height / 2 - default_magnifier.height / 2}px;
    animation: magnifier ${default_magnifier.total_time}s ease-in-out forwards;
}
#magnifier:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: ${default_magnifier.border_radius}px;
    background-color: ${default_magnifier.color_overlay};
}
@keyframes magnifier {
`
}

magnifiers.forEach(function (item, index) {

    if(!default_magnifier.continuos) {
    magnifiers_css += `#magnifier_${index} {
    position: absolute;
    top: ${magnifiers[index].top_position + magnifiers[index].height / 2}px;
    left: ${magnifiers[index].left_position + magnifiers[index].width / 2}px;
    width: ${magnifiers[index].width}px;
    height: ${magnifiers[index].height}px;
    transform: translate(-50%, -50%);
    border-radius: ${magnifiers[index].border_radius}px;
    border: solid ${magnifiers[index].border_width}px ${magnifiers[index].border_color};
    background: url(${$("#object_img").getAttribute('src')}) no-repeat -${magnifiers[index].left_position + magnifiers[index].width / 2 - default_magnifier.width / 2}px -${magnifiers[index].top_position + magnifiers[index].height / 2 - default_magnifier.height / 2}px;
    animation: magnifier_${index} ${magnifiers[index].animation_time}s ease-in-out forwards;
}
#magnifier_${index}:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: ${magnifiers[index].border_radius}px;
    background-color: ${magnifiers[index].color_overlay};
}
@keyframes magnifier_${index} {
    0%, 100% {
        width: ${default_magnifier.width}px;
        height: ${default_magnifier.height}px;
        background-size: ${$("#object_img").naturalWidth}px ${$("#object_img").naturalHeight}px;
        background-position: -${magnifiers[index].left_position + magnifiers[index].width / 2 - default_magnifier.width / 2}px -${magnifiers[index].top_position + magnifiers[index].height / 2 - default_magnifier.height / 2}px;
    }
    50% {
        width: ${magnifiers[index].width}px;
        height: ${magnifiers[index].height}px;
        background-size: ${$("#object_img").naturalWidth * default_magnifier.zoom}px ${$("#object_img").naturalHeight * default_magnifier.zoom}px;
        background-position: -${magnifiers[index].left_position * default_magnifier.zoom}px -${magnifiers[index].top_position *default_magnifier.zoom}px;
    }
}
`
        let node = document.createElement("div");
        node.setAttribute('id', 'magnifier_'+index);
        $("#top_mask").appendChild(node);
    } else {
        magnifiers_css +=`
    ${100 / magnifiers.length * index}% {
        background-size: ${$("#object_img").naturalWidth}px ${$("#object_img").naturalHeight}px;
        background-position: -${magnifiers[index].left_position + magnifiers[index].width / 2 - default_magnifier.width / 2}px -${magnifiers[index].top_position + magnifiers[index].height / 2 - default_magnifier.height / 2}px;
        top: ${magnifiers[index].top_position + magnifiers[index].height / 2}px;
        left: ${magnifiers[index].left_position + magnifiers[index].width / 2}px;
        width: ${default_magnifier.width}px;
        height: ${default_magnifier.height}px;
        border-radius: ${default_magnifier.border_radius}px;
    }
    ${100 / magnifiers.length * index + 100 / (magnifiers.length * 3)}% {
        background-size: ${$("#object_img").naturalWidth * default_magnifier.zoom}px ${$("#object_img").naturalHeight * default_magnifier.zoom}px;
        background-position: -${magnifiers[index].left_position * default_magnifier.zoom}px -${magnifiers[index].top_position *default_magnifier.zoom}px;
        width: ${magnifiers[index].width}px;
        height: ${magnifiers[index].height}px;
        border-radius: ${magnifiers[index].border_radius}px;
        opacity: 1;
    }
    ${100 / magnifiers.length * index + 200 / (magnifiers.length * 3)}% {
        top: ${magnifiers[index].top_position + magnifiers[index].height / 2}px;
        left: ${magnifiers[index].left_position + magnifiers[index].width / 2}px;
        opacity: 1;
    }
        `
    }
});

if(default_magnifier.continuos) {
    magnifiers_css +=`
    100% {
        background-size: ${$("#object_img").naturalWidth}px ${$("#object_img").naturalHeight}px;
        background-position: -${magnifiers[magnifiers.length - 1].left_position + magnifiers[magnifiers.length - 1].width / 2 - default_magnifier.width / 2}px -${magnifiers[magnifiers.length - 1].top_position + magnifiers[magnifiers.length - 1].height / 2 - default_magnifier.height / 2}px;
        top: ${magnifiers[magnifiers.length - 1].top_position + magnifiers[magnifiers.length - 1].height / 2}px;
        left: ${magnifiers[magnifiers.length - 1].left_position + magnifiers[magnifiers.length - 1].width / 2}px;
        width: ${default_magnifier.width}px;
        height: ${default_magnifier.height}px;
        opacity: 0;
    }
}
    `
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
#top_mask {
    position: relative;
}
${magnifiers_css}
`

function $(sel) {
    return document.querySelector(sel);
}

$("#main_css").innerHTML = main_css_upd;