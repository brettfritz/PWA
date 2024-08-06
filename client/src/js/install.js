const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Handle the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the hidden class from the install button container
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    // Show the install prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    // Show the prompt
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    console.log('User choice:', result);
    // Clear the deferredPrompt so it can only be used once.
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  });
});

// Handle the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
