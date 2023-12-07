
let sendRequest = async (url: string, type: string, body: {} | null = null, contentType: string = "application/json") => {

    let options = {
        mode: 'cors',
        method: type,
        headers: {
            'Content-Type': contentType
        },
    };

    if((type == "POST" || type == "PUT") && contentType == "application/json" && body != null) {
        options.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(url, options);
        if(response.status == 200) {
            let json = await response.json();
            return json;
        }
        else {
            return {
                error: "Unable to get a response from the server",
            }
        }
    }
    catch(err) {
        return {
            error: err
        }
    }
}

export {sendRequest}