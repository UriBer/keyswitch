// Restore the selected keyboard layouts
function restoreOptions() {
    browser.storage.local.get(['sourceLayout', 'targetLayout']).then((result) => {
      document.getElementById('sourceLayout').value = result.sourceLayout || 'en';
      document.getElementById('targetLayout').value = result.targetLayout || 'he';
    });
  }
  
  // Save the selected keyboard layouts
  function saveOptions() {
    const sourceLayout = document.getElementById('sourceLayout').value;
    const targetLayout = document.getElementById('targetLayout').value;
    browser.storage.local.set({ sourceLayout, targetLayout });
  }
  
  // Event listeners
  document.getElementById('sourceLayout').addEventListener('change', saveOptions);
  document.getElementById('targetLayout').addEventListener('change', saveOptions);
  document.addEventListener('DOMContentLoaded', restoreOptions);