const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/get_email_id/");
    xhr.setRequestHeader('Content-Type', 'application/json');
    let body = JSON.stringify({"email": email});
    xhr.send(body);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let email_id = xhr.responseText;
            xhr.open("POST", "http://127.0.0.1:8000/get_code_from_id/");
            xhr.setRequestHeader('Content-Type', 'application/json');
            body = JSON.stringify({"email_id": email_id});
            xhr.send(body);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let response = xhr.responseText;
                    let code_span = document.getElementById("code")
                    let code_field = document.getElementById("code-field")
                    code_field.style.display = 'inline-block';
                    if (response === "ACTIVATION_CANCELED"){
                        code_span.innerText = "Ваша почта была отменена. Активируйте и повторите попытку!"
                    } else if (response === "WAIT_LINK"){
                        code_span.innerText = "Ваше письмо еще не получено сервисом. Пожалуйста, повторите попытку через несколько минут!"
                    } else {
                        code_span.innerText = response
                    }
                    code_span.style.display = 'block'
                }
            }
        }
    }
});