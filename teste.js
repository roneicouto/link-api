async function tresSegundos() {
  console.log('3 segundos')
  return dezSegundos()
}

async function dezSegundos() {
  await new Promise(resolve=>setTimeout(resolve,10000))
  console.log('10 segundos')
}

async function teste() {
  await tresSegundos()
  return 'ok'
}

teste().then(console.log)