function toggleSwitchChanged () {
    // Send an AJAX request to update the boolean value in config.yaml
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/toggle_default_talk', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}