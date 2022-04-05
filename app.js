let sumbit = document.querySelector("#submit");

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        sumbit.click()
    }
})

sumbit.addEventListener("click", () => {
    let userInput = document.querySelector("#user_input");
    let genarateLink = userInput.value;

    userInput.value = null;
    setTimeout(function() {
        userInput.style.textAlign = "center"
        userInput.disabled = true;
        userInput.style.height = "38px";
        user_input.value = "Getting Video info........"
    }, 100)

    setTimeout(function() {

        let xmlReq = new XMLHttpRequest();

        xmlReq.open("GET", `https://cors-anywhere.herokuapp.com/${genarateLink}`);
        xmlReq.responseType = "document";

        xmlReq.onload = function() {
            if (xmlReq.readyState == 4 && xmlReq.status == 200) {

                let table = document.querySelector(".table");
                let thumbnail = document.querySelector(".thumbnail");
                let video_title = document.querySelector(".video-title");
                let video_views = document.querySelector(".video-views");
                let video_thumbnail = document.querySelector(".yt-img");
                let video_link = document.querySelector(".video-link");
                let channel_link = document.querySelector(".channel-link");
                let videopDate = document.querySelector(".video-date");
                let videoGenre = document.querySelector(".video-genre");

                table.style.display = "inline-table";
                thumbnail.style.display = "block";
                let response = xmlReq.responseXML.querySelectorAll("div");
                let infoFinder = response[0].children;

                video_title.innerText = infoFinder[1].content;
                video_views.innerText = infoFinder[18].content;
                userInput.value = null;
                userInput.disabled = false;
                userInput.style.textAlign = "left";


                let thumbnaileFinder = infoFinder[10].href;
                video_thumbnail.setAttribute("src", thumbnaileFinder)


                let videoLinkFinder = "https://www.youtube.com/watch?v=" + infoFinder[5].content;
                video_link.innerText = videoLinkFinder;

                channel_link.innerText = "https://www.youtube.com/channel/" + infoFinder[4].content;

                videopDate.innerText = infoFinder[19].content

                videoGenre.innerText = infoFinder[21].content;

                console.log("Generate Success!")

            } else {
                let error = document.querySelector(".error");
                let thumbnailSec = document.querySelector(".thumbnail");
                let table = document.querySelector(".table");


                error.style.display = "block"
                error.classList.add("animate__zoomInDown");
                thumbnailSec.style.display = "none";
                table.style.display = "none"
                console.log("An error occered! Refresh the page.")
            }
        }

        xmlReq.onerror = function() {
            console.error(xmlReq.status, xmlReq.statusText);
        };
        xmlReq.send()

    }, 300)
})