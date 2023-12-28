import { getToken } from "./token";

let sendRequest = async (url: string, type: string, body: {} | null = null, contentType: string = "application/json", addContentType: boolean = true, addToken: boolean = true) => {

    let options = {
        mode: 'cors',
        method: type,
        headers: {
        },
    };

    if(addContentType) {
        options.headers['Content-Type'] = contentType;
    }

    if(addToken) {
        let token = getToken();
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if((type == "POST" || type == "PUT") && contentType == "application/json" && body != null) {
        options.body = JSON.stringify(body);
    } else if(body != null) {
        options.body = body;
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