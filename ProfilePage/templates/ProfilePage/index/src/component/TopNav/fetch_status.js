import React from "react";
import {css} from "@emotion/core";
import {RingLoader} from "react-spinners";

const override = css`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
`;

class FetchStatus extends React.Component {
    copyText = () => {
        let copy_btn = document.getElementById('copy_event_btn');
        navigator.clipboard.writeText(this.props.created_url).then(function () {
            navigator.clipboard.readText().then(function () {
                copy_btn.textContent = 'LINK COPIED';
            })
        }, function () {
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
                        <p>Link Shortened successfully</p>
                        <p id="copy_event_btn" onClick={this.copyText}>
                            {
                                this.props.reset_copy_text === true ? 'COPY LINK' : 'COPY LINK'
                            }
                        </p>
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