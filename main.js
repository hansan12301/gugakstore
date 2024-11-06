const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const exitBtn = document.getElementById("exitBtn");
const body = document.body; // body 요소 선택

menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
    menuBtn.classList.add("inactive");
    exitBtn.classList.remove("inactive");

    body.classList.add("no-scroll"); // 스크롤 비활성화
});

exitBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    exitBtn.classList.add("inactive");
    menuBtn.classList.remove("inactive");

    body.classList.remove("no-scroll"); // 스크롤 다시 활성화
});

document.querySelectorAll(".accordionBox button").forEach(button => {
    button.addEventListener("click", () => {
        const li = button.closest("li");
        const p = li.querySelector("p");
        const img = button.querySelector("img"); // 버튼 내부의 이미지 선택
        
        if (p.classList.contains("active")) {
            p.style.height = `${p.scrollHeight}px`;
            requestAnimationFrame(() => {
            p.style.height = "0";
            p.style.opacity = "0";
            });
    
            p.addEventListener("transitionend", () => {
            if (!p.classList.contains("active")) {
                p.style.display = "none";
                p.style.height = ""; 
            }
            }, { once: true });
    
            img.classList.remove("rotated"); // 이미지 회전 제거
        } else {
            p.style.display = "block";
            p.style.height = "0";
            p.style.opacity = "0";
    
            requestAnimationFrame(() => {
            p.style.height = `${p.scrollHeight}px`;
            p.style.opacity = "1";
            });
    
            p.addEventListener("transitionend", () => {
            p.style.height = "auto";
            }, { once: true });
    
            img.classList.add("rotated"); // 이미지 180도 회전 추가
        }
    
        p.classList.toggle("active");
    });
});

document.querySelectorAll("#timeTable th").forEach(th => {
    th.addEventListener("click", () => {
        document.querySelectorAll("th").forEach(th => th.classList.remove("greenBox"));
        th.classList.add("greenBox");

        const thText = th.textContent.trim();

        if (thText =="11/23(토)" || thText === "12/07(토)") {
            document.getElementById("workshop2").classList.remove("inactive");
            document.getElementById("stateExam").classList.add("inactive");
        } else {
            document.getElementById("stateExam").classList.remove("inactive");
            document.getElementById("workshop2").classList.add("inactive");
        }
    });
});

document.querySelector('#btnSave').addEventListener('click', () => {
    console.log(document.querySelector("#headword"));
    
    const fileName = `lettering.svg`;
    // SVG 요소 가져오기
    const content = document.querySelector('#lettering').outerHTML;
    // 데이터 준비
    const dataUrl = 'data:image/svg+xml,\n' + encodeURIComponent(content);
    // BOM의 문자 깨짐 방지
    const bom = new Unit8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, content], {type: 'text/plain' });
    
    if (window.navigator.msSaveBlob) {
        // IE용
        window.navigator.msSaveBlob(blob, fileName);
    } else if (window.URL && window.URL.createObjectURL) {
        // 파이어 폭스, 크롬, 사파리용
        const a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        // 기타
        window.open(dataUrl, '_blank');
    }
});