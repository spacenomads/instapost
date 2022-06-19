const downloadBlock = document.querySelector('.js__download');
const fileField = document.querySelector('.js__field-file');
const post = document.querySelector('.js__post');
const postPhrase = post.querySelector('.js__phrase');

function readDataFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const data = reader.result;
    const phrases = [];
    const lines = data
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    lines.forEach(line => {
      phrases.push(`"${line}"`);
    });
    createPosts(phrases)
  };
  reader.readAsText(file);
}


function createPosts(phrases) {
  const totalImages = phrases.length;
  let index = 0;
  const interval = setInterval(() => {
    if (index < totalImages) {
      postPhrase.innerText = phrases[index];
      downloadPost(index);
      index++;
    } else {
      clearInterval(interval);
    }
  } , 500);
}


function downloadPost(index) {
  html2canvas(post).then(canvas => {
    const postUrl = canvas.toDataURL('image/png');
    console.log(postUrl);
    const link = document.createElement('a');
    link.href = postUrl;
    link.download = `post-${index}.png`;
    link.click();
  });


}




fileField.addEventListener('change', readDataFile);



