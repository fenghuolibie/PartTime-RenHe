


// 自动定位当前城市
var map = new BMap.Map("allmap");
var myCity = new BMap.LocalCity();
var mapsize = 13;
myCity.get(locationCity);
//弹出窗口的样式
var opts = {
    width: 602, // 信息窗口宽度
    height: 140, // 信息窗口高度
    panel: "panel", //检索结果面板
    enableAutoPan: true, //自动平移
    searchTypes: [
        /*BMAPLIB_TAB_TO_HERE,  //到这里去
            BMAPLIB_TAB_FROM_HERE //从这里出发*/
    ]
}

//省份切换
loadData(schoolInfo,false);

$("#province").change(function() {
    var province_id = $(this).val();
    var province_val = $(this).find("option:selected").text();
    //alert('province_id');
    map.centerAndZoom(province_val, mapsize);
    //var url = window.basePath+'brand/ajax_city_info';
    var url = basePath+"brand/ajax_city_info";
    $.post(url,{pid:province_id},function(e){
        if(e.rsm){
            $("#city").html(e.msg);
            $("#city_position").html(e.area_name);
            var school_data = e.school_info;
            if(school_data == ""){
                $("#city_school_number").html(0);//校区总数
                $("#school_info").html('<ul><li>该地区校区还在筹建中</li></ul>');
            }else{
                $("#city_school_number").html(JSON.parse(school_data).length);//校区总数
                loadData(school_data,true);
            }
        }
    },'json');
})

//城市切换
$("#city").change(function() {
    var city_id = $(this).val();
    var city_val = $(this).find("option:selected").text();
    map.centerAndZoom(city_val, mapsize);
    var url = basePath+"brand/get_school_by_city";
    $.post(url,{pid:city_id},function(e){
        if(e.rsm){
            var school_data = e.school_info;
            $("#city_position").html(e.area_name);
            if(school_data == ""){
                $("#city_school_number").html(0);//校区总数
                $("#school_info").html('<ul><li>该地区校区还在筹建中</li></ul>');
            }else{
                $("#city_school_number").html(JSON.parse(school_data).length);//校区总数
                loadData(school_data,true);
            }
        }
    },'json');
})


//添加覆盖物
function loadData(school_info,status) {
    if(status){
        var school_info = JSON.parse(school_info);
    }
    var school_string = '<ul>';
    if(school_info.length > 0){
        for (var i = 0; i < school_info.length; i++) {


            var school_name = school_info[i]['name'];
            var content = '<div class="lq_main_map_maptc school_info"><div class="lq_main_map_maptc_title clearfix"><img src=http://zy.whrhkj.com/img/ol/map/map_logo.png width="100" height="26"><h2></h2></div><div class="lq_main_map_maptc_dizhi"><p>地址：' + school_info[i]['address'] + '</p><p>电话：' + school_info[i]['tel'] + '</p></div></div>';
            school_string = school_string + "<li onclick=openInfoWindow2(this,'" + school_info[i]['name'] + "','" + school_info[i]['tel'] + "','" + school_info[i]['address'] + "','" + school_info[i]['longitude'] + "','" + school_info[i]['latitude'] + "')>" + school_info[i]['name'] + "</li>";
            var marker = new BMap.Marker(new BMap.Point(school_info[i][0], school_info[i][1]));
            map.addOverlay(marker);
            openinfo(school_name, content, marker);
        }
    }else{
        school_string = school_string + "<li>该地区校区还在筹建中</li>";
    }

    school_string = school_string + '</ul>';
    $("#school_info").html(school_string);

}
//直接在校区上面点击弹出的框
function openInfoWindow2(obj, title, tel, address, longitude, latitude) {



    $(obj).addClass('hover').siblings('li').removeClass('hover');
    var sub_content = '<div class="lq_main_map_maptc school_info" ><div class="lq_main_map_maptc_title clearfix"><img src=http://zy.whrhkj.com/img/ol/map/map_logo.png width="100" height="26"><h2>' + title + '</h2></div><div class="lq_main_map_maptc_dizhi"><p>地址：' + address + '</p><p>电话：' + tel + '</p></div></div>';
    var searchInfoWindow2 = new BMapLib.SearchInfoWindow(map, sub_content, {
        title: title,
        width: opts.width,
        height: opts.height,
        panel: opts.panel,
        enableAutoPan: opts.enableAutoPan,
        searchTypes: opts.searchTypes,
        enableMessage:false
    });
    searchInfoWindow2.open(new BMap.Point(longitude, latitude));
}
//点击标注来弹出内容:地图上面的标注
function openinfo(school_name, content, marker) {
    marker.addEventListener("click", function(e) {
        var searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title: school_name,
            width: opts.width,
            height: opts.height,
            panel: opts.panel,
            enableAutoPan: opts.enableAutoPan,
            searchTypes: opts.searchTypes,
            enableMessage:false
        });
        searchInfoWindow.open(marker);
    });
    map.addOverlay(marker); //在地图中添加marker
}
//非地图的标注来点击弹出层
//依据IP来定位城市
function locationCity(result) {
    var cityName = result.name; //获得城市名称
    var longitude = result.center.lng; //获取城市的经度
    var latitude = result.center.lat; //获取城市的纬度
    var level = result.level; //获取城市的显示大小
    var point = new BMap.Point(longitude, latitude);
    map.centerAndZoom(point, mapsize);
    //添加缩放比例的控件
    var navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true
    });
    map.addControl(navigationControl);
    /*map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用*/
    // 添加带有定位的导航控件

}

