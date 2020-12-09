import React from "react";
import {css} from "@emotion/core";
import {RingLoader} from "react-spinners";

const override = css`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
`;

class FetchStatus extends React.Component {
     fallbackCopyTextToClipboard = (text) => {
        let textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            let copy_btn = document.getElementById('copy_event_btn');
            if (msg === 'successful') {
                copy_btn.textContent = 'LINK COPIED';
            }
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    copyTextToClipboard = () => {
        let text = this.props.created_url;
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            let copy_btn = document.getElementById('copy_event_btn');
            copy_btn.textContent = 'LINK COPIED';
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    render() {
        const link_created = () => {
            if (this.props.link_created) {
                return (
                    <div id="successful_link">
                        <p className="material-icons" id="verified_icon">
                            verified
                        </p>
                        <p id="copy_event_btn" onClick={this.copyTextToClipboard}>
                            {
                                this.props.reset_copy_text === true ? 'COPY LINK' : 'COPY LINK'
                            }
                        </p>
                        <p id="user_url">{this.props.created_url}</p>
                    </div>
                )
            }
        }
        return (
            <div id="display_status">
                <RingLoader
                    css={override}
                    size={90}
                    color={"#1d3557"}
                    loading={this.props.loading}
                />
                {link_created()}
            </div>
        )
    }
}

export default FetchStatus