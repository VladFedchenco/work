let ctx, imgs_loaded, win_sector, light_counter, stars_counter, win_prize_counter, dust_counter, blink, section_remaining_spins, section_get_more_spins;

let cnvs = $('#main_canvas');
let anim_play = true;
let game_start = false;
let img_preload = [];
let rotate_counter = 0;
let angles = [];
let prerender = [];
let win_frames = [];
let stars_frames = [];
let leprcn_opacity = 1;
let dust_opacity = 1;
let dust_frames = [];

angles[0] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1094.553, 1108.671, 1122.360, 1135.632, 1148.493, 1160.952, 1173.018, 1184.697, 1196.001, 1206.936, 1217.511, 1227.732, 1237.611, 1247.151, 1256.364, 1265.256, 1273.833, 1282.104, 1290.075, 1297.755, 1305.150, 1312.269, 1319.118, 1325.703, 1332.030, 1338.108, 1343.943, 1349.541, 1354.911, 1360.056, 1364.985, 1369.701, 1374.213, 1378.524, 1382.643, 1386.576, 1390.326, 1393.902, 1397.307, 1400.547, 1403.628, 1406.556, 1409.334, 1411.968, 1414.464, 1416.825, 1419.057, 1421.166, 1423.155, 1425.030, 1426.794, 1428.453, 1430.010, 1431.471, 1432.839, 1434.117, 1435.311, 1436.421, 1437.456, 1438.416, 1439.307, 1440];
angles[1] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305, 1320, 1335, 1350, 1365, 1380, 1395, 1409.553, 1423.671, 1437.360, 1450.632, 1463.493, 1475.952, 1488.018, 1499.697, 1511.001, 1521.936, 1532.511, 1542.732, 1552.611, 1562.151, 1571.364, 1580.256, 1588.833, 1597.104, 1605.075, 1612.755, 1620.150, 1627.269, 1634.118, 1640.703, 1647.030, 1653.108, 1658.943, 1664.541, 1669.911, 1675.056, 1679.985, 1684.701, 1689.213, 1693.524, 1697.643, 1701.576, 1705.326, 1708.902, 1712.307, 1715.547, 1718.628, 1721.556, 1724.334, 1726.968, 1729.464, 1731.825, 1734.057, 1736.166, 1738.155, 1740.030, 1741.794, 1743.453, 1745.010, 1746.471, 1747.839, 1749.117, 1750.311, 1751.421, 1752.456, 1753.416, 1754.307, 1755];
angles[2] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305, 1320, 1335, 1350, 1364.553, 1378.671, 1392.360, 1405.632, 1418.493, 1430.952, 1443.018, 1454.697, 1466.001, 1476.936, 1487.511, 1497.732, 1507.611, 1517.151, 1526.364, 1535.256, 1543.833, 1552.104, 1560.075, 1567.755, 1575.150, 1582.269, 1589.118, 1595.703, 1602.030, 1608.108, 1613.943, 1619.541, 1624.911, 1630.056, 1634.985, 1639.701, 1644.213, 1648.524, 1652.643, 1656.576, 1660.326, 1663.902, 1667.307, 1670.547, 1673.628, 1676.556, 1679.334, 1681.968, 1684.464, 1686.825, 1689.057, 1691.166, 1693.155, 1695.030, 1696.794, 1698.453, 1700.010, 1701.471, 1702.839, 1704.117, 1705.311, 1706.421, 1707.456, 1708.416, 1709.307, 1710];
angles[3] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305, 1319.553, 1333.671, 1347.360, 1360.632, 1373.493, 1385.952, 1398.018, 1409.697, 1421.001, 1431.936, 1442.511, 1452.732, 1462.611, 1472.151, 1481.364, 1490.256, 1498.833, 1507.104, 1515.075, 1522.755, 1530.150, 1537.269, 1544.118, 1550.703, 1557.030, 1563.108, 1568.943, 1574.541, 1579.911, 1585.056, 1589.985, 1594.701, 1599.213, 1603.524, 1607.643, 1611.576, 1615.326, 1618.902, 1622.307, 1625.547, 1628.628, 1631.556, 1634.334, 1636.968, 1639.464, 1641.825, 1644.057, 1646.166, 1648.155, 1650.030, 1651.794, 1653.453, 1655.010, 1656.471, 1657.839, 1659.117, 1660.311, 1661.421, 1662.456, 1663.416, 1664.307, 1665];
angles[4] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1274.553, 1288.671, 1302.360, 1315.632, 1328.493, 1340.952, 1353.018, 1364.697, 1376.001, 1386.936, 1397.511, 1407.732, 1417.611, 1427.151, 1436.364, 1445.256, 1453.833, 1462.104, 1470.075, 1477.755, 1485.150, 1492.269, 1499.118, 1505.703, 1512.030, 1518.108, 1523.943, 1529.541, 1534.911, 1540.056, 1544.985, 1549.701, 1554.213, 1558.524, 1562.643, 1566.576, 1570.326, 1573.902, 1577.307, 1580.547, 1583.628, 1586.556, 1589.334, 1591.968, 1594.464, 1596.825, 1599.057, 1601.166, 1603.155, 1605.030, 1606.794, 1608.453, 1610.010, 1611.471, 1612.839, 1614.117, 1615.311, 1616.421, 1617.456, 1618.416, 1619.307, 1620];
angles[5] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1229.553, 1243.671, 1257.360, 1270.632, 1283.493, 1295.952, 1308.018, 1319.697, 1331.001, 1341.936, 1352.511, 1362.732, 1372.611, 1382.151, 1391.364, 1400.256, 1408.833, 1417.104, 1425.075, 1432.755, 1440.150, 1447.269, 1454.118, 1460.703, 1467.030, 1473.108, 1478.943, 1484.541, 1489.911, 1495.056, 1499.985, 1504.701, 1509.213, 1513.524, 1517.643, 1521.576, 1525.326, 1528.902, 1532.307, 1535.547, 1538.628, 1541.556, 1544.334, 1546.968, 1549.464, 1551.825, 1554.057, 1556.166, 1558.155, 1560.030, 1561.794, 1563.453, 1565.010, 1566.471, 1567.839, 1569.117, 1570.311, 1571.421, 1572.456, 1573.416, 1574.307, 1575];
angles[6] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1184.553, 1198.671, 1212.360, 1225.632, 1238.493, 1250.952, 1263.018, 1274.697, 1286.001, 1296.936, 1307.511, 1317.732, 1327.611, 1337.151, 1346.364, 1355.256, 1363.833, 1372.104, 1380.075, 1387.755, 1395.150, 1402.269, 1409.118, 1415.703, 1422.030, 1428.108, 1433.943, 1439.541, 1444.911, 1450.056, 1454.985, 1459.701, 1464.213, 1468.524, 1472.643, 1476.576, 1480.326, 1483.902, 1487.307, 1490.547, 1493.628, 1496.556, 1499.334, 1501.968, 1504.464, 1506.825, 1509.057, 1511.166, 1513.155, 1515.030, 1516.794, 1518.453, 1520.010, 1521.471, 1522.839, 1524.117, 1525.311, 1526.421, 1527.456, 1528.416, 1529.307, 1530];
angles[7] = [0, 0.003, 0.012, 0.033, 0.072, 0.141, 0.252, 0.417, 0.651, 0.972, 1.401, 1.956, 2.661, 3.543, 4.629, 5.946, 7.527, 9.402, 11.607, 14.178, 17.154, 20.577, 24.489, 28.932, 33.954, 39.606, 45.933, 52.992, 60.834, 69.516, 79.095, 89.631, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1139.553, 1153.671, 1167.360, 1180.632, 1193.493, 1205.952, 1218.018, 1229.697, 1241.001, 1251.936, 1262.511, 1272.732, 1282.611, 1292.151, 1301.364, 1310.256, 1318.833, 1327.104, 1335.075, 1342.755, 1350.150, 1357.269, 1364.118, 1370.703, 1377.030, 1383.108, 1388.943, 1394.541, 1399.911, 1405.056, 1409.985, 1414.701, 1419.213, 1423.524, 1427.643, 1431.576, 1435.326, 1438.902, 1442.307, 1445.547, 1448.628, 1451.556, 1454.334, 1456.968, 1459.464, 1461.825, 1464.057, 1466.166, 1468.155, 1470.030, 1471.794, 1473.453, 1475.010, 1476.471, 1477.839, 1479.117, 1480.311, 1481.421, 1482.456, 1483.416, 1484.307, 1485];

let scale = [0, 0.0001, 0.0007, 0.0023, 0.0055, 0.0107, 0.0185, 0.0294, 0.0439, 0.0625, 0.0857, 0.1141, 0.1481, 0.1884, 0.2353, 0.2894, 0.3512, 0.4212, 0.5, 0.5788, 0.6488, 0.7106, 0.7647, 0.8116, 0.8519, 0.8859, 0.9143, 0.9375, 0.9561, 0.9706, 0.9815, 0.9893, 0.9945, 0.9977, 0.9993, 1];

let requestURL = 'js/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const prizeData = request.response;
  win_sector = prizeData.win_sector;
  $("#initial_spins").innerHTML = prizeData.initial_spins;
  $("#headline1").innerHTML = prizeData.headline1;
  $("#headline2").innerHTML = prizeData.headline2;
  $("#prize_info_part1").innerHTML = prizeData.prize_info_part1;
  $("#prize_info_part2").innerHTML = prizeData.prize_info_part2;
  section_remaining_spins = prizeData.remaining_spins;
  $("#spins_number").innerHTML = prizeData.spins_number;
  section_get_more_spins = prizeData.get_more_spins;
  $("#entries_number").innerHTML = prizeData.entries_number;

  init();

}

function init() {

  ctx = cnvs.getContext('2d');

  wheel_base = new Image();
  wheel_base.src = 'imgs/wheel_base.png';
  img_preload[0] = false;
  wheel_base.onload = function() {
    img_preload[0] = true;
  }

  wheel_sectors = new Image();
  wheel_sectors.src = 'imgs/wheel_sectors.png';
  img_preload[1] = false;
  wheel_sectors.onload = function() {
    // for (let i = 0; i < angles[win_sector].length; i++) {
    //   prerender[i] = document.createElement('canvas');
    //   let pctx = prerender[i].getContext('2d');
    //   prerender[i].width = 512;
    //   prerender[i].height = 512;
    //   pctx.translate(256, 256);
    //   pctx.rotate(angles[win_sector][i] * Math.PI / 180);
    //   pctx.translate(-256, -256);
    //   pctx.drawImage(wheel_sectors, 0, 0, 512, 512);
    // }
    img_preload[1] = true;
  }

  wheel_shadow = new Image();
  wheel_shadow.src = 'imgs/wheel_shadow.png';
  img_preload[2] = false;
  wheel_shadow.onload = function() {
    img_preload[2] = true;
  }

  wheel_ridge = new Image();
  wheel_ridge.src = 'imgs/wheel_ridge.png';
  img_preload[3] = false;
  wheel_ridge.onload = function() {
    img_preload[3] = true;
  }

  wheel_lamps_yellow = new Image();
  wheel_lamps_yellow.src = 'imgs/wheel_lamps_yellow.png';
  img_preload[4] = false;
  wheel_lamps_yellow.onload = function() {
    img_preload[4] = true;
  }

  wheel_lamps_red = new Image();
  wheel_lamps_red.src = 'imgs/wheel_lamps_red.png';
  img_preload[5] = false;
  wheel_lamps_red.onload = function() {
    img_preload[5] = true;
  }

  wheel_lamps_yellow2 = new Image();
  wheel_lamps_yellow2.src = 'imgs/wheel_lamps_yellow2.png';
  img_preload[6] = false;
  wheel_lamps_yellow2.onload = function() {
    img_preload[6] = true;
  }

  wheel_lamps_red2 = new Image();
  wheel_lamps_red2.src = 'imgs/wheel_lamps_red2.png';
  img_preload[7] = false;
  wheel_lamps_red2.onload = function() {
    img_preload[7] = true;
  }

  wheel_arrow = new Image();
  wheel_arrow.src = 'imgs/wheel_arrow.png';
  img_preload[8] = false;
  wheel_arrow.onload = function() {
    img_preload[8] = true;
  }

  wheel_center = new Image();
  wheel_center.src = 'imgs/wheel_center.png';
  img_preload[9] = false;
  wheel_center.onload = function() {
    img_preload[9] = true;
  }

  leprcn_01 = new Image();
  leprcn_01.src = 'imgs/leprcn_00.png';
  img_preload[10] = false;
  leprcn_01.onload = function() {
    img_preload[10] = true;
  }

  leprcn_02 = new Image();
  leprcn_02.src = 'imgs/leprcn_0' + (win_sector + 1) + '.png';
  img_preload[11] = false;
  leprcn_02.onload = function() {
    img_preload[11] = true;
  }

  win_prize_counter = 0;
  win_prize = new Image();
  win_prize.src = 'imgs/sector' + win_sector + '.png';
  img_preload[12] = false;
  win_prize.onload = function() {
    for (let i = 0; i < 36; i++) {
      win_frames[i] = document.createElement('canvas');
      let pctx = win_frames[i].getContext('2d');
      win_frames[i].width = 340;
      win_frames[i].height = 444;
      let x = 170 - scale[i] * 340 / 2;
      let y = 444 - scale[i] * 444;
      pctx.drawImage(win_prize, x, y, scale[i] * 340, scale[i] * 444);
    }
    img_preload[12] = true;
  }

  stars_counter = 0;
  stars = new Image();
  stars.src = 'imgs/stars.png';
  img_preload[13] = false;
  stars.onload = function() {
    for (let i = 0; i < 36; i++) {
      stars_frames[i] = document.createElement('canvas');
      let pctx = stars_frames[i].getContext('2d');
      stars_frames[i].width = 614;
      stars_frames[i].height = 390;
      let x = 307 - scale[i] * 614 / 2;
      let y = 390 - scale[i] * 390;
      pctx.drawImage(stars, x, y, scale[i] * 614, scale[i] * 390);
    }
    img_preload[13] = true;
  }

  dust_counter = 0;
  blink = 0;

  dust_frames[0] = new Image();
  dust_frames[0].src = 'imgs/dust1.png';
  img_preload[14] = false;
  dust_frames[0].onload = function() {
    img_preload[14] = true;
  }

  dust_frames[1] = new Image();
  dust_frames[1].src = 'imgs/dust2.png';
  img_preload[15] = false;
  dust_frames[1].onload = function() {
    img_preload[15] = true;
  }

  dust_frames[2] = new Image();
  dust_frames[2].src = 'imgs/dust3.png';
  img_preload[16] = false;
  dust_frames[2].onload = function() {
    img_preload[16] = true;
  }

  draw();
}

function draw() {

  for( let i = 0; i<img_preload.length; i++) {
    if (!img_preload[i]) {
      imgs_loaded = false;
      break;
    } else {
      imgs_loaded = true;
    }
  }

  if(imgs_loaded) {
    ctx.clearRect(0, 0, 750, 860);
    if(!game_start) {

      ctx.drawImage(wheel_base, 0, 0, 750, 860);
      ctx.drawImage(wheel_sectors, 118, 109, 512, 512);

      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(wheel_shadow, 0, 0, 750, 860);
      ctx.globalCompositeOperation = 'source-over';

      ctx.drawImage(wheel_ridge, 0, 0, 750, 860);
      ctx.drawImage(wheel_lamps_yellow, 0, 0, 750, 860);
      ctx.drawImage(wheel_lamps_red, 0, 0, 750, 860);

      light_counter < 100 ? light_counter++ : light_counter = 0;

      if(light_counter < 50) {
        ctx.drawImage(wheel_lamps_yellow2, 0, 0, 750, 860);
      }

      if(light_counter >= 50 && light_counter < 100) {
        ctx.drawImage(wheel_lamps_red2, 0, 0, 750, 860);
      }

      ctx.drawImage(wheel_arrow, 0, 0, 750, 860);
      ctx.drawImage(wheel_center, 0, 0, 750, 860);
      ctx.drawImage(leprcn_01, 0, 0, 750, 860);

    } else {

      ctx.drawImage(wheel_base, 0, 0, 750, 860);

      rotate_counter < (angles[win_sector].length - 1) ? rotate_counter++ : rotate_counter = (angles[win_sector].length - 1);
      ctx.drawImage(wheel_sectors, 118, 109, 512, 512);

      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(wheel_shadow, 0, 0, 750, 860);
      ctx.globalCompositeOperation = 'source-over';

      ctx.drawImage(wheel_ridge, 0, 0, 750, 860);
      ctx.drawImage(wheel_lamps_yellow, 0, 0, 750, 860);
      ctx.drawImage(wheel_lamps_red, 0, 0, 750, 860);

      light_counter < 100 ? light_counter++ : light_counter = 0;

      if(light_counter < 50) {
        ctx.drawImage(wheel_lamps_yellow2, 0, 0, 750, 860);
      }

      if(light_counter >= 50 && light_counter < 100) {
        ctx.drawImage(wheel_lamps_red2, 0, 0, 750, 860);
      }

      ctx.drawImage(wheel_arrow, 0, 0, 750, 860);
      ctx.drawImage(wheel_center, 0, 0, 750, 860);

      blink < 5 ? blink++ : blink = 0;
      if(blink == 0) {
        dust_counter < 2 ? dust_counter++ : dust_counter = 0;
        dust_opacity > 0.1 ? dust_opacity -= 0.1 : dust_opacity = 0;
      }
      ctx.globalAlpha = dust_opacity;
      ctx.drawImage(dust_frames[dust_counter], 0, 100 * (1 - dust_opacity) - 30, 750, 860);
      ctx.globalAlpha = 1;

      leprcn_opacity > 0 ? leprcn_opacity -= .025 : leprcn_opacity = 0;

      if( leprcn_opacity > 0 ) {
        ctx.globalAlpha = leprcn_opacity;
        ctx.drawImage(leprcn_01, 0, 0, 750, 860);
        ctx.globalAlpha = 1;
      }

      if(rotate_counter == (angles[win_sector].length - 1)) {
        win_prize_counter < 35 ? win_prize_counter++ : win_prize_counter = 35;
        ctx.drawImage(stars_frames[win_prize_counter], 64, 84, 614, 390);
        if(win_sector == 0 || win_sector == 1 || win_sector == 2 || win_sector == 5) {
          if (win_prize_counter > 24) {
            ctx.globalAlpha = 1 - (35 - win_prize_counter) / 10;
            ctx.drawImage(leprcn_02, 0, 0, 750, 860);
            ctx.globalAlpha = 1;
          }
          ctx.drawImage(win_frames[win_prize_counter], 204, 214, 340, 444);
        } else {
          ctx.drawImage(win_frames[win_prize_counter], 204, 214, 340, 444);
          if (win_prize_counter > 24) {
            ctx.globalAlpha = 1 - (35 - win_prize_counter) / 10;
            ctx.drawImage(leprcn_02, 0, 0, 750, 860);
            ctx.globalAlpha = 1;
          }
        }


        if(win_prize_counter == 35) {
          outer_function();
          anim_play = false;
        }
      }

    }
  }

  if(anim_play) {
    window.requestAnimationFrame(draw);
  }

}

function $(sel) {
  return document.querySelector(sel);
}

function easing(t) { return t<.5 ? 2*t*t : -1+2*(2-t)*t };

function point_over() {
  if(!game_start) {
    cnvs.style.cursor = "pointer";
  }
}

function point_out() {
  cnvs.style.cursor = "default";
}

function start_game() {
  if(imgs_loaded) {
    game_start = true;
    cnvs.style.cursor = "default";
    $("#intro_area").setAttribute("class", "invis");
  }
}

function outer_function() {
  $("#prize_texts").setAttribute("class", "");
  if(section_remaining_spins) {
    $("#remaining_spins").setAttribute("class", "");
  }
  if(section_get_more_spins) {
    $("#get_more_spins").setAttribute("class", "");
    $("#prize_texts p br").style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  cnvs.addEventListener('pointerover', point_over, false);
  cnvs.addEventListener('pointerout', point_out, false);
  cnvs.addEventListener('pointerup', start_game, false);
  $("#start_bttn").addEventListener('pointerup', start_game, false);
})