
const submitBtn = document.getElementsByClassName("form-wrapper-button")[0]
let comment = document.getElementById("comment")

function sendData() {

    let patch = comment.value;

    $.ajax({
        type: 'PATCH',
        url: `/${obj.id}/comment`,
        data: JSON.stringify(patch),
        processData: false,
        contentType: 'application/merge-patch+json',
     });

    return;
}

submitBtn.addEventListener("click", () => {
    console.log(comment)
})
