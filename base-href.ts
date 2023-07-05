export default function getBaseHref() {
  const currentUrl = window.location.href;

  const deploymentPath = '/smoothDiningAngular/';
  if (currentUrl.includes(deploymentPath)) {
    return deploymentPath;
  } else {
    return '/';
  }
}
