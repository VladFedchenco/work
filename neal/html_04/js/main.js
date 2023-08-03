let im_profile;

let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const AnimationData = request.response;
  let im1 = AnimationData.scene1.im_profile;
  setAttributes($("#im_profile"), {"href": im1.im_path, "width": im1.im_dimensions[0], "height": im1.im_dimensions[1], "x": 640 - im1.pos_eyes[0], "y": 360 - im1.pos_eyes[1]});
  let txt1 = AnimationData.scene1.txt_profile;
  $("#avatar_text").textContent = txt1.content;
  setAttributes($("#avatar_text"), {"font-size": txt1.size, "fill": txt1.color, "x": txt1.position[0], "y": txt1.position[1]});
  let im2 = AnimationData.scene1.im_bg;
  setAttributes($("#im_bg"), {"href": im2.im_path, "width": im2.im_dimensions[0], "height": im2.im_dimensions[1], "x": 1280 - im2.im_dimensions[0] / 2, "y": 360 - im2.im_dimensions[1] / 2});
  let im3 = AnimationData.scene1.im_overlay;
  setAttributes($("#logo"), {"href": im3.im_path, "width": im3.im_dimensions[0], "height": im3.im_dimensions[1], "x": im3.position[0], "y": im3.position[1]});
  let im4 = AnimationData.scene2.im;
  setAttributes($("#scene2_im"), {"href": im4.im_path, "width": im4.im_dimensions[0], "height": im4.im_dimensions[1], "x": im4.position[0], "y": im4.position[1]});
  setAttributes($("#scene2_im2"), {"href": im4.im_path, "width": im4.im_dimensions[0], "height": im4.im_dimensions[1], "x": im4.position[0], "y": im4.position[1]});
  let txt2 = AnimationData.scene2.txt_line1;
  $("#scene2_txt1").textContent = txt2.content;
  setAttributes($("#scene2_txt1"), {"font-size": txt2.size, "fill": txt2.color, "x": txt2.position[0], "y": txt2.position[1]});
  let txt3 = AnimationData.scene2.txt_line2;
  $("#scene2_txt2").textContent = txt3.content;
  setAttributes($("#scene2_txt2"), {"font-size": txt3.size, "fill": txt3.color, "x": txt3.position[0], "y": txt3.position[1]});
  let im5 = AnimationData.scene3.im;
  setAttributes($("#scene3_bg"), {"href": im5.im_path, "width": im5.im_dimensions[0], "height": im5.im_dimensions[1], "x": im5.position[0], "y": im5.position[1]});
  let txt4 = AnimationData.scene3.txt_line1;
  $("#scene3_txt1").textContent = txt4.content;
  setAttributes($("#scene3_txt1"), {"font-size": txt4.size, "fill": txt4.color, "x": txt4.position[0], "y": txt4.position[1]});
  let txt5 = AnimationData.scene3.txt_line2;
  $("#scene3_txt2").textContent = txt5.content;
  setAttributes($("#scene3_txt2"), {"font-size": txt5.size, "fill": txt5.color, "x": txt5.position[0], "y": txt5.position[1]});
  let txt6 = AnimationData.scene3.txt_sub;
  $("#scene3_txt3").textContent = txt6.content;
  setAttributes($("#scene3_txt3"), {"font-size": txt6.size, "fill": txt6.color, "x": txt6.position[0], "y": txt6.position[1]});
  let styles = `:root {
        --scene_01_duration: ${AnimationData.scene1.duration + "s"};
        --scene_02_duration: ${AnimationData.scene2.duration + "s"};
        --scene_03_duration: ${AnimationData.scene3.duration + "s"};
      }`
  $("#animations_vars").innerHTML = styles;

  let combinations = AnimationData.combinations;
  let cur_t = 0;
  let cur_delay = 0;
  let zind = 4;
  let current_scene, next_scene;
  for (i = 0; i < combinations.length; i++ ) {
    let cur_scene = $("#scene_0" + combinations[i]);
    current_scene = combinations[i];
    next_scene = combinations[i + 1];
    setTimeout(function() {
      cur_scene.style.zIndex = zind;
      zind++;
      cur_scene.classList.add("play");
    }, cur_t - cur_delay);
    cur_t += AnimationData["scene" + combinations[i]].duration * 1000;
    if(next_scene < current_scene) {
      switch (current_scene) {
        case 1:
          cur_delay = AnimationData.scene1.duration * 500;
          break;
        case 2:
          cur_delay = AnimationData.scene2.duration * 650;
          break;
        case 3:
          cur_delay = AnimationData.scene3.duration * 300;
          break;
        default:
          cur_delay = 0;
      }
      setTimeout(function() {
          $("#transition").classList.add("play");
          setTimeout(function() {
              $("#transition").classList.remove("play");
          }, 800);
      }, cur_t - cur_delay - 400);
      if(current_scene == 3) {
          setTimeout(function() {
            cur_scene.classList.remove("play");
          }, cur_t - cur_delay);
      } else {
        setTimeout(function() {
          cur_scene.classList.remove("play");
        }, cur_t - 400);
      }
    } else {
      switch (current_scene) {
        case 1:
          cur_delay = AnimationData.scene1.duration * 100;
          if(current_scene == 1 && next_scene == 3) {
            cur_delay = AnimationData.scene1.duration * 270;
          }
          break;
        case 2:
          cur_delay = AnimationData.scene2.duration * 610;
          break;
        case 3:
          cur_delay = AnimationData.scene3.duration * 100;
          break;
        default:
          cur_delay = 0;
      }
      setTimeout(function() {
        cur_scene.classList.remove("play");
      }, cur_t);
    }
  }
  if(current_scene == 1) {
    cur_delay = AnimationData.scene1.duration * 220;
    setTimeout(function() {
        $("#black_out").classList.add("play");
    }, cur_t - cur_delay - 600);
  } else {
    setTimeout(function() {
        $("#black_out").classList.add("play");
    }, cur_t - 600);
  }
}

function $(sel) {
  return document.querySelector(sel);
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

