export default function getBaseHref() {
  const base = document.getElementById('base');

  const currentUrl = window.location.href;

  const deploymentPath = '/smoothDiningAngular/';
  if (currentUrl.includes(deploymentPath)) {
    return deploymentPath;
  } else {
    base?.setAttribute('href', '');
    return '/';
  }
}
