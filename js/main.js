/// 메가박스 메인 페이지 JS - main.js ///

$(function () { /////// jQB ///////////////////////
    console.log("로딩완료!");

    /// 1. 영화페이지 포스터 클릭시 예고편 보여주고 하단 이동
    // 대상: .gbox img
    $(".gbox img").click(function () {

        // 플레이 이미지 중앙으로 보내기~~!!!
        // 이미지순번을 알아내어 0,1,2,3,4중 중앙은 2번임
        // 만약 3번을 클릭하면 이것을 중앙으로 보내기위해 오른쪽버튼 트리거!
        // 만약 1번을 클릭하면 이것을 중앙으로 보내기위해 왼쪽버튼 트리거!

        // 포스터 순번
        var pseq = $(this).index();
        console.log("포순:" + pseq);

        // 3번클릭 오른쪽트리거
        if (pseq === 3) $(".rb").trigger("click");
        // 1번클릭 왼쪽트리거
        else if (pseq === 1) $(".lb").trigger("click");
        // 0번,4번은 돌아가!
        else if (pseq === 0 || pseq === 4) return false;



        // 1. 영화포스터 네비 작아지게 하단 이동하기 //////
        // 방법: transform: scale() 사용
        //  - css transition 설정으로 애니메이션 구현
        $(".gbox, .abtn").css({
            top: "80%",
            transform: "translateY(-50%) scale(.4)",
            transition: "all .6s ease-in-out"
        }); ///// css ////////////////

        /*버튼위치 세부조정*/
        $(".lb").css({
            left: "30%"
        }); //// css /////
        $(".rb").css({
            right: "30%"
        }); //// css /////

        /// 2. 동영상 보이게 하고 data-mv 속성값으로 동영상정보를 불러옴
        // 클릭된 이미지의 data-mv속성값 읽어오기
        var mv = $(this).attr("data-mv");
        console.log("동영상정보:" + mv);

        // 변경대상: #mv
        $("#mv").attr("src", "mv/" + mv + ".mp4") //경로변경
            .fadeIn(300) //서서히 보이게
            .get(0) // 동영상 컬렉션 순번(첫번째0)
            .play(); // 동영상 play하기
        /*
        document.getElementById("mv").play();
        - JS에서는 video태그를 선택후 play() 메서드를 바로 사용하여 
        동영상을 재생할 수 있다.
        - 그런데 제이쿼리에서는 $(비디오요소).get(0).play() 로 사용한다.
        -> 왜 get(0)을 쓰는가?
            - 제이쿼리는 분석된 자료를 컬렉션화하는데 동영상은 get() 메서드에 
            넣어서 사용할 수 있도록 한다.
            따라서 get(순번) 메서드를 호출한 후 play() 메서드를 사용한다!       */


        // 포스터가 아래로 내려간 상태반영하기!
        msts = 1;
        // 이동버튼이 내려간 상태에서 중앙 포스터 동영상 재생하기에 쓰려고 셋팅함

    }); ////////// click ///////////////
    
    /// 2. 동영상 제어버튼 오버/아웃시  이미지변경하기 ////
    // 이벤트 대상: .btngrp img
    // 변경원리: 기존버튼의 src를 읽어와서
    //          파일명의 ".png"를 "-1.png"로 변경함(진한이미지)
    // hover() 사용
    $(".btngrp img").hover(
        function(){// over
            // 현재 이미지 경로
            var csrc = $(this).attr("src")
            // 경로변경하기
            .replace(".png","-1.png");
            //console.log("경로:"+csrc);
            // 이미지변경
            $(this).attr("src",csrc);
        },
        function(){// out
            // 현재 이미지 경로
            var csrc = $(this).attr("src")
            // 경로변경하기
            .replace("-1.png",".png");
            //console.log("경로:"+csrc);
            // 이미지변경
            $(this).attr("src",csrc);
        });////// hover ////////////////////
    
    
    //////////// 비디오변수 ///////
    var mvid = $("#mv").get(0);
    //////////////////////////////
    
    /// 3. play/stop버튼 클릭시 비디오 컨트롤하기 ////////
    /// 이벤트 대상: .btngrp img
    /// 구현원리 : 재생상태이면 멈추고 멈춤상태이면 재생한다.
    $(".btngrp img").click(function(){
        // 구현포인트: 비디오가 재생상태인지 멈춤상태인지 알아내기!
        var paused_sts = mvid.paused;
        // paused 속성은 현재 비디오가 멈춤상태이면 true값을 리턴함
        console.log("현재멈춤상태인가?"+paused_sts);
        
        if(paused_sts){ // 동영상이 멈췄니? true(응)
            // 비디오 재생하기 - play() 메서드 : 비디오 재생하기
            mvid.play();
            
            // 버튼은 반대로 진한이미지로 전환!(멈춤)
            $(this).attr("src","images/vbt1-1.png");
            
        } /////  if ////////////////////
        else{ // 동영상이 멈췄니? false(아니)
            // 비디오 멈추기 - pause() 메서드 : 비디오 멈추기
            mvid.pause();
            
            // 버튼은 반대로 진한이미지로 전환!(재생)
            $(this).attr("src","images/vbt2-1.png");
            
        } ///// else ///////////////////
        
    });///////// click ///////////////////////
    
    







    // 갤러리 이미지 이동 대상: 갤러리박스(.gbox)
    var tg = $(".gbox");

    /*////////////////////////////////
        함수명: goSlide
        기능: 슬라이드 방향별 이동
    */ ////////////////////////////////
    // 광클금지 변수
    var sprot = 0; //0-허용,1-금지
    // 메뉴상태 변수
    var msts = 0; //0-원래상태,1-내려간상태

    /////////////////////////////
    var goSlide = function (dir) {

        console.log("광클금지상태:" + sprot);

        /// 광클금지 설정 //////////////
        if (sprot === 1) return false;
        sprot = 1; //잠금
        setTimeout(function () {
            sprot = 0; //0.4초후 해제!
        }, 400); /// 타임아웃 ///                
        //////////////////////////////

        //dir-방향(0-왼쪽,1-오른쪽)
        console.log("이동방향:" + dir);
        

        // 오른쪽 전달값이 1이므로 true
        if (dir) {

            // 맨앞이미지 선택
            var first = tg.find("img").first();
            // 맨앞이미지 맨뒤로 이동
            tg.append(first);
            

        } /// if /////////////////
        // 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {

            // 맨뒤이미지 선택
            var last = tg.find("img").last();
            // 맨뒤이미지 맨앞으로 이동
            tg.prepend(last);
            

        } ////// else //////////////


        // 메뉴가 내려간 상태이면 중앙 포스터 동영상 재생!
        if (msts === 1) {
            // 잘라낸 후 중앙 이미지 순번은 2번임!
            var mv = $(".gbox img").eq(2).attr("data-mv");
            console.log("동영상정보:" + mv);

            // 변경대상: #mv
            $("#mv").attr("src", "mv/" + mv + ".mp4") //경로변경
                .get(0) // 동영상 컬렉션 순번(첫번째0)
                .play(); // 동영상 play하기
        } //// if /////////////////////


    }; /////// goSlide함수 ////////////
    //////////////////////////////////




    /// 오른쪽버튼 클릭시 갤러리박스 맨앞이미지 맨뒤로이동
    $(".rb").click(function () {
        console.log("오른쪽!");

        // 슬라이드 이동함수 호출!
        goSlide(1); //오른쪽 전달값은 1

    }); //////// click ////////////

    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤이미지 맨앞으로이동
    $(".lb").click(function () {
        console.log("왼쪽!");

        // 슬라이드 이동함수 호출!
        goSlide(0); //왼쪽 전달값은 0

    }); //////// click ////////////







}); ////////// jQB ///////////////////////////////
/////////////////////////////////////////////////
