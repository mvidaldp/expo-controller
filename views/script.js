/**
 * Handle the toggle switch change event.
 * Sends an AJAX request to update the boolean value in config.yaml.
 */
function toggleSwitchChanged () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/toggle_default_talk', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

/**
 * Handle the restart of the left Windows computer.
 * Sends an AJAX request to perform the restart operation.
 */
function restartLeft () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/restart_left', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

/**
 * Handle the restart of the right Windows computer.
 * Sends an AJAX request to perform the restart operation.
 */
function restartRight () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/restart_right', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
