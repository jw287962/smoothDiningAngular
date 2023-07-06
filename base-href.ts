export function getBaseHref() {
  const currentUrl = window.location.href;

  const deploymentPath = '/smoothDiningAngular/';
  if (currentUrl.includes(deploymentPath)) {
    return deploymentPath;
  } else {
    return '/';
  }
}

export function getBackEndHref() {
  const currentUrl = window.location.href;

  const deploymentPath = '/smoothDiningAngular/';
  if (currentUrl.includes(deploymentPath)) {
    return 'https://smoothdining.azurewebsites.net';
  } else {
    return 'http://localhost:3000';
  }
}
