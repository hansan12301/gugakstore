function loadContent() {
    // 현재 HTML 파일 이름 추출 후 디코딩
    const pageName = decodeURIComponent(window.location.pathname.split("/").pop().replace(".html", ""));
    console.log("Current page name:", pageName); // 디코딩된 파일 이름 출력
    
    fetch('headword.json')
        .then(response => response.json())
        .then(data => {
            // headwords 배열에서 현재 페이지 이름과 일치하는 항목을 찾기
            const headword = data.headwords.find(item => item.hasOwnProperty(pageName));
            console.log("Headword found:", headword); // 찾은 데이터 출력
    
            // 데이터를 HTML 요소에 삽입
            if (headword) {
            const content = headword[pageName];
            document.getElementById('title').innerText = pageName;
            document.getElementById('manuscript').innerText = content.manuscript;
            document.getElementById('author').innerText = content.author;
            document.getElementById('workNote').innerText = content.workNote;
            document.getElementById('link').href = "https://www.gugak.go.kr/ency/topic/view/" + content.link;
            } else {
            console.error("해당 항목을 찾을 수 없습니다.");
            }
        })
        .catch(error => console.error("JSON 파일을 불러오는 중 오류 발생:", error));
}

window.onload = loadContent;

function goBack() {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = '../headword.html'; // 히스토리가 없을 경우 이동할 페이지
    }
}