class State {
    constructor() {
        var _state = '';
        var _prevState = ''
        this.state = function(stateText) {
            if (arguments.length) {
                _state = stateText;
            }
            else {
                return _state;
            }
        };
        this.prevState = function(stateText) {
            if (arguments.length) {
                _prevState = stateText;
            }
            else {
                return _prevState;
            }
        };
        this.error = (() => {
                return {
                    header: 'Error',
                    patterns: {
                        connectionError: 'Check your internet connection!',
                }
            }
        });
        this.success = (() => {
                return {
                    header: 'Success',
                    patterns: {
                        successfullyLoaded: 'Loaded successfully completed!',
                }
            }
        });
        this.wait = (() => {
                return {
                    header: 'Waiting',
                    patterns: {
                        connecting: 'Connecting...',
                }
            }
        });
    }
    setErrorState(stateText) {
        this.state(`${this.error().header}: ${stateText}`);
    }
    setSuccessState(stateText) {
        this.state(`${this.success().header}: ${stateText}`);
    }
    setWaitingState(stateText) {
        this.state(`${this.wait().header}: ${stateText}`);
    }
    setConnectionError() {
        this.state(`${this.error().header}: ${this.error().patterns.connectionError}`);
    }
    setLoadedSuccess() {
        this.state(`${this.success().header}: ${this.success().patterns.successfullyLoaded}`);
    }
    setConnecting() {
        this.state(`${this.wait().header}: ${this.wait().patterns.connecting}`);
    }
}
module.exports = State;