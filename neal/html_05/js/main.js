let im_profile;

let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const AnimationData = request.response;
  let combinations = [];
  let svg_code = "";
  let styles = "";
  let duration = 0;
  let delay = 0;
  let current_type, next_type;

  for (i = 1; i <= Object.keys(AnimationData).length; i++ ) {
    if (AnimationData["p" + i].type == 1) {
      svg_code += `
<svg id="scene_${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <g class="im_bg_box">
        <image class="im_bg" href="${AnimationData["p" + i].im_bg.im_path}" width="${AnimationData["p" + i].im_bg.im_dimensions[0]}" height="${AnimationData["p" + i].im_bg.im_dimensions[1]}" x="${1280 - AnimationData["p" + i].im_bg.im_dimensions[0] / 2}" y="${360 - AnimationData["p" + i].im_bg.im_dimensions[1] / 2}"></image>
    </g>
    <rect class="sc1_dark_rect" width="1280" height="720" fill="#000" opacity=".7" />
    <image class="logo" href="${AnimationData["p" + i].im_overlay.im_path}" width="${AnimationData["p" + i].im_overlay.im_dimensions[0]}" height="${AnimationData["p" + i].im_overlay.im_dimensions[1]}" x="${AnimationData["p" + i].im_overlay.position[0]}" y="${AnimationData["p" + i].im_overlay.position[1]}"></image>
    <rect class="dark_bg" width="1280" height="720" fill="#1f1f1f" />
    <clipPath id="white_clip_${i}">
        <rect class="white_clp" width="1280" height="720" />
    </clipPath>
    <g clip-path="url(#white_clip_${i})">
        <rect class="white_bg" width="1280" height="720" fill="#fff" />
        <clipPath id="avatar_${i}">
            <circle class="c1" cx="640" cy="360" r="4.5" />
            <circle class="c2" cx="640" cy="360" r="30" />
            <circle class="c3" cx="640" cy="360" r="68.5" />
            <circle class="c4" cx="640" cy="360" r="88.5" />
            <circle class="c5" cx="640" cy="360" r="101" />
            <circle class="c6" cx="640" cy="360" r="109" />
            <circle class="c7" cx="640" cy="360" r="114.14" />
            <circle class="c8" cx="640" cy="360" r="117" />
            <circle class="c9" cx="640" cy="360" r="119.5" />
            <circle class="c10" cx="640" cy="360" r="121.5" />
            <circle class="c11" cx="640" cy="360" r="122" />
            <path class="c12" d="M650 238h-20a122 122 0 0 0 0 244h20a122 122 0 0 0 0-244z" />
            <path class="c13" d="M703 238H577a122 122 0 0 0 0 244h126a122 122 0 0 0 0-244z" />
            <path class="c14" d="M762 238H518a122 122 0 0 0 0 244h244a122 122 0 0 0 0-244z" />
            <path class="c15" d="M793 238H487a122 122 0 0 0 0 244h306a122 122 0 0 0 0-244z" />
            <path class="c16" d="M810 238H470a122 122 0 0 0 0 244h340a122 122 0 0 0 0-244z" />
            <path class="c17" d="M823 238H457a122 122 0 0 0 0 244h366a122 122 0 0 0 0-244z" />
            <path class="c18" d="M829 238H451a122 122 0 0 0 0 244h378a122 122 0 0 0 0-244z" />
            <path class="c19" d="M833 238H447a122 122 0 0 0 0 244h386a122 122 0 0 0 0-244z" />
            <path class="c20" d="M836 238H444a122 122 0 0 0 0 244h392a122 122 0 0 0 0-244z" />
            <path class="c21" d="M836 238H444a122 122 0 0 0 0 244h392a122 122 0 0 0 0-244z" />
            <path class="c22" d="M836 238H444a122 122 0 0 0 0 244h392a122 122 0 0 0 0-244z" />
            <path class="c23" d="M823 238H439a122 122 0 0 0 0 244h384a122 122 0 0 0 0-244z" />
            <path class="c24" d="M759 238H423a122 122 0 0 0 0 244h336a122 122 0 0 0 0-244z" />
            <path class="c25" d="M611 238H389a122 122 0 0 0 0 244h222a122 122 0 0 0 0-244z" />
            <path class="c26" d="M505 238H363a122 122 0 0 0 0 244h142a122 122 0 0 0 0-244z" />
            <path class="c27" d="M444 238h-96a122 122 0 0 0 0 244h96a122 122 0 0 0 0-244z" />
            <path class="c28" d="M402 238h-64a122 122 0 0 0 0 244h64a122 122 0 0 0 0-244z" />
            <path class="c29" d="M374 238h-44a122 122 0 0 0 0 244h44a122 122 0 0 0 0-244z" />
            <path class="c30" d="M354 238h-28a122 122 0 0 0 0 244h28a122 122 0 0 0 0-244z" />
            <path class="c31" d="M340 238h-16a122 122 0 0 0 0 244h16a122 122 0 0 0 0-244z" />
            <path class="c32" d="M330 238h-10a122 122 0 0 0 0 244h10a122 122 0 0 0 0-244z" />
            <path class="c33" d="M324 238h-4a122 122 0 0 0 0 244h4a122 122 0 0 0 0-244z" />
            <path class="c34" d="M320 238h-2a122 122 0 0 0 0 244h2a122 122 0 0 0 0-244z" />
            <circle class="c35" cx="318" cy="360" r="122" />
        </clipPath>
        <g class="avatar_circle" clip-path="url(#avatar_${i})">
            <image class="im_profile" href="${AnimationData["p" + i].im_profile.im_path}" width="${AnimationData["p" + i].im_profile.im_dimensions[0]}" height="${AnimationData["p" + i].im_profile.im_dimensions[1]}" x="${640 - AnimationData["p" + i].im_profile.pos_eyes[0]}" y="${360 - AnimationData["p" + i].im_profile.pos_eyes[1]}"></image>
        </g>
        <rect class="text_bg" x="164" y="528" width="320" height="52" fill="#1f1f1f" />
        <clipPath id="txt_clip_${i}">
            <rect class="text_clp" x="164" y="528" width="320" height="52" />
        </clipPath>
        <text clip-path="url(#txt_clip_${i})" class="avatar_text" font-size="${AnimationData["p" + i].txt_profile.size}" fill="${AnimationData["p" + i].txt_profile.color}" x="${AnimationData["p" + i].txt_profile.position[0]}" y="${AnimationData["p" + i].txt_profile.position[1]}" text-anchor="middle">${AnimationData["p" + i].txt_profile.content}</text>
    </g>
</svg>
`
    duration = AnimationData["p" + i].duration;
    styles += `
    #scene_${i} .im_profile {
        animation: im_profile ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
     #scene_${i} .c1, #scene_${i} .c2, #scene_${i} .c3, #scene_${i} .c4, #scene_${i} .c5, #scene_${i} .c6, #scene_${i} .c7, #scene_${i} .c8, #scene_${i} .c9, #scene_${i} .c10, #scene_${i} .c11, #scene_${i} .c12, #scene_${i} .c13, #scene_${i} .c14, #scene_${i} .c15, #scene_${i} .c16, #scene_${i} .c17, #scene_${i} .c18, #scene_${i} .c19, #scene_${i} .c20, #scene_${i} .c21, #scene_${i} .c22, #scene_${i} .c23, #scene_${i} .c24, #scene_${i} .c25, #scene_${i} .c26, #scene_${i} .c27, #scene_${i} .c28, #scene_${i} .c29, #scene_${i} .c30, #scene_${i} .c31, #scene_${i} .c32, #scene_${i} .c33, #scene_${i} .c34, #scene_${i} .c35 {
        visibility: hidden;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        animation-iteration-count: infinite;
        animation-timing-function: steps(1);
    }
    #scene_${i} .c1 {animation-name: c1}
    #scene_${i} .c2 {animation-name: c2}
    #scene_${i} .c3 {animation-name: c3}
    #scene_${i} .c4 {animation-name: c4}
    #scene_${i} .c5 {animation-name: c5}
    #scene_${i} .c6 {animation-name: c6}
    #scene_${i} .c7 {animation-name: c7}
    #scene_${i} .c8 {animation-name: c8}
    #scene_${i} .c9 {animation-name: c9}
    #scene_${i} .c10 {animation-name: c10}
    #scene_${i} .c11 {animation-name: c11}
    #scene_${i} .c12 {animation-name: c12}
    #scene_${i} .c13 {animation-name: c13}
    #scene_${i} .c14 {animation-name: c14}
    #scene_${i} .c15 {animation-name: c15}
    #scene_${i} .c16 {animation-name: c16}
    #scene_${i} .c17 {animation-name: c17}
    #scene_${i} .c18 {animation-name: c18}
    #scene_${i} .c19 {animation-name: c19}
    #scene_${i} .c20 {animation-name: c20}
    #scene_${i} .c21 {animation-name: c21}
    #scene_${i} .c22 {animation-name: c22}
    #scene_${i} .c23 {animation-name: c23}
    #scene_${i} .c24 {animation-name: c24}
    #scene_${i} .c25 {animation-name: c25}
    #scene_${i} .c26 {animation-name: c26}
    #scene_${i} .c27 {animation-name: c27}
    #scene_${i} .c28 {animation-name: c28}
    #scene_${i} .c29 {animation-name: c29}
    #scene_${i} .c30 {animation-name: c30}
    #scene_${i} .c31 {animation-name: c31}
    #scene_${i} .c32 {animation-name: c32}
    #scene_${i} .c33 {animation-name: c33}
    #scene_${i} .c34 {animation-name: c34}
    #scene_${i} .c35 {animation-name: c35}
    #scene_${i} .text_bg, #scene_${i} .text_clp {
        animation: text_bg ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .avatar_text {
        animation: avatar_text ${duration}s ${delay}s forwards;
    }
    #scene_${i} .white_bg {
        animation: white_bg ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .dark_bg {
        animation: dark_bg ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .im_bg {
        animation: im_bg ${duration}s ${delay}s linear forwards;
    }
    #scene_${i} .im_bg_box {
        animation: im_bg_box ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .white_clp {
        animation: white_clp ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .logo, #scene_${i} .sc1_dark_rect {
        animation: logo ${duration}s ${delay}s linear forwards;
  }
`
    delay += duration * .9;
    }
    if(AnimationData["p" + i].type == 2) {
      current_type = AnimationData["p" + i].type;
      if(i < Object.keys(AnimationData).length) {
        next_type = AnimationData["p" + (i + 1)].type;
      } else {
        next_type = 0;
      }
      svg_code += `
<svg id="scene_${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <clipPath id="scene2im_clip_${i}">
        <rect class="scene2im_clp" width="640" height="720" x="640" y="0" fill="#1f1f1f" />
    </clipPath>
    <image class="scene2_im" href="${AnimationData["p" + i].im.im_path}" width="${AnimationData["p" + i].im.im_dimensions[0]}" height="${AnimationData["p" + i].im.im_dimensions[1]}" x="${AnimationData["p" + i].im.position[0]}" y="${AnimationData["p" + i].im.position[1]}" clip-path="url(#scene2im_clip_${i})"></image>
    <rect class="scene2_bg" width="1280" height="720" fill="#1f1f1f" />
    <clipPath id="scene2_clip_${i}">
        <rect class="scene2_clp" width="1280" height="720" fill="#1f1f1f" />
    </clipPath>
    <g clip-path="url(#scene2_clip_${i})">
        <g class="scene2_txt">
            <text class="scene2_txt1" font-size="${AnimationData["p" + i].txt_line1.size}" fill="${AnimationData["p" + i].txt_line1.color}" x="${AnimationData["p" + i].txt_line1.position[0]}" y="${AnimationData["p" + i].txt_line1.position[1]}">${AnimationData["p" + i].txt_line1.content}</text>
            <text class="scene2_txt2" font-size="${AnimationData["p" + i].txt_line2.size}" fill="${AnimationData["p" + i].txt_line2.color}" x="${AnimationData["p" + i].txt_line2.position[0]}" y="${AnimationData["p" + i].txt_line2.position[1]}">${AnimationData["p" + i].txt_line2.content}</text>
        </g>
    </g>
    <image class="scene2_im2" href="${AnimationData["p" + i].im.im_path}" width="${AnimationData["p" + i].im.im_dimensions[0]}" height="${AnimationData["p" + i].im.im_dimensions[1]}" x="${AnimationData["p" + i].im.position[0]}" y="${AnimationData["p" + i].im.position[1]}" clip-path="url(#scene2im_clip_${i})"></image>
</svg>
`
    if(next_type < current_type && next_type != 0) {
        svg_code += `
<svg id="transition${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <rect class="transition_top" x="0" y="0" width="1280" height="360" fill="#1f1f1f" />
    <rect class="transition_bottom" x="0" y="360" width="1280" height="360" fill="#1f1f1f" />
</svg>
`
    }
    duration = AnimationData["p" + i].duration;
    styles += `
    #scene_${i} .scene2_bg, #scene_${i} .scene2_clp {
        animation: scene2_bg ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .scene2_im {
        animation: scene2_im ${duration}s ${delay}s linear forwards;
    }
    #scene_${i} .scene2_im2 {
        animation: scene2_im2 ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .scene2_txt {
        animation: scene2_txt ${duration}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
`
    if(next_type < current_type && next_type != 0) {
      styles += `
    #transition${i} {
      z-index: ${100 + i}
    }
    #transition${i} .transition_top {
      animation: transition_top 1.1s ${duration + delay - 1}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #transition${i} .transition_bottom {
        animation: transition_bottom 1.1s ${duration + delay - 1}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
`
    }
    delay += duration * .9;
    }
    if(AnimationData["p" + i].type == 3) {
      current_type = AnimationData["p" + i].type;
      if(i < Object.keys(AnimationData).length) {
        next_type = AnimationData["p" + (i + 1)].type;
      } else {
        next_type = 0;
      }
      svg_code += `
<svg id="scene_${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <image class="scene3_bg" href="${AnimationData["p" + i].im.im_path}" width="${AnimationData["p" + i].im.im_dimensions[0]}" height="${AnimationData["p" + i].im.im_dimensions[1]}" x="${AnimationData["p" + i].im.position[0]}" y="${AnimationData["p" + i].im.position[1]}"></image>
    <g class="scene3_txt">
        <g class="scene3_txt1_wrp"><text font-size="${AnimationData["p" + i].txt_line1.size}" fill="${AnimationData["p" + i].txt_line1.color}" x="${AnimationData["p" + i].txt_line1.position[0]}" y="${AnimationData["p" + i].txt_line1.position[1]}" class="scene3_txt1">${AnimationData["p" + i].txt_line1.content}</text></g>
        <g class="scene3_txt2_wrp"><text font-size="${AnimationData["p" + i].txt_line2.size}" fill="${AnimationData["p" + i].txt_line2.color}" x="${AnimationData["p" + i].txt_line2.position[0]}" y="${AnimationData["p" + i].txt_line2.position[1]}" class="scene3_txt2">${AnimationData["p" + i].txt_line2.content}</text></g>
        <g class="scene3_txt3_wrp"><text font-size="${AnimationData["p" + i].txt_sub.size}" fill="${AnimationData["p" + i].txt_sub.color}" x="${AnimationData["p" + i].txt_sub.position[0]}" y="${AnimationData["p" + i].txt_sub.position[1]}" class="scene3_txt3">${AnimationData["p" + i].txt_sub.content}</text></g>
    </g>
</svg>
`
    if(next_type < current_type && next_type != 0) {
        svg_code += `
<svg id="transition${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <rect class="transition_top" x="0" y="0" width="1280" height="360" fill="#1f1f1f" />
    <rect class="transition_bottom" x="0" y="360" width="1280" height="360" fill="#1f1f1f" />
</svg>
`
    }
    duration = AnimationData["p" + i].duration;
    styles += `
    #scene_${i} .scene3_bg {
        animation: scene3_bg ${duration - .5}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .scene3_txt {
        animation: scene3_txt ${duration - .5}s ${delay}s linear forwards;
    }
    #scene_${i} .scene3_txt1_wrp {
        animation: scene3_txt1_wrp ${duration - .5}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .scene3_txt2_wrp {
        animation: scene3_txt2_wrp ${duration - .5}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #scene_${i} .scene3_txt3_wrp {
        animation: scene3_txt3_wrp ${duration - .5}s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
`
    if(next_type < current_type && next_type != 0) {
      styles += `
    #transition${i} {
      z-index: ${100 + i}
    }
    #transition${i} .transition_top {
      animation: transition_top 1.1s ${duration + delay - 1}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
    #transition${i} .transition_bottom {
        animation: transition_bottom 1.1s ${duration + delay - 1}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
`
    }
    delay += duration * .9;
    }
  }

    svg_code += `
<svg id="black_out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <rect id="last_bg" width="1280" height="720" fill="#1f1f1f" />
</svg>
`
    styles += `
    #last_bg {
        animation: last_bg .6s ${delay}s cubic-bezier(0, 1, 0.5, 1) forwards;
    }
`

  $("#animation").innerHTML = svg_code;
  $("#animations_vars").innerHTML = styles;
}

function $(sel) {
  return document.querySelector(sel);
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

