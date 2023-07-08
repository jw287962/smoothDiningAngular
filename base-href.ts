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

  const deploymentPath = 'localhost:4200';

  if (currentUrl.includes(deploymentPath)) {
    return 'http://localhost:3000';
  } else {
    return 'https://smoothdining.azurewebsites.net';
  }
}
