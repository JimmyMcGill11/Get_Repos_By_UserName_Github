const title = document.createElement("h1");
title.textContent = "GIT HUB Repos By User Name";
document.body.appendChild(title);
title.style.cssText = `
  margin: auto;
  width: fit-content;
`;

const inputContainer = document.createElement("div");
document.body.appendChild(inputContainer);
inputContainer.style.cssText = `
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const input = document.createElement("input");
inputContainer.appendChild(input);
input.style.cssText = `
  flex: 1;
  padding: 10px;
  background-color: #000;
  color: #ddd;
  border: 1px solid #444;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 16px;
`;

const btn = document.createElement("button");
inputContainer.appendChild(btn);
btn.textContent = "OK"
btn.classList.add("btn")
btn.style.cssText = `
  padding: 10px;
  background-color: rgb(120 0 0);
  color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  margin-left: 10px;
  transition: .3s;
  cursor: pointer;
`;


btn.addEventListener("click", function () {
  let githubUser = "";
  if (input.value.length != 0) {
    githubUser = input.value.trim();
  }

  if (githubUser.length != 0) {
    const myReposRequest = new XMLHttpRequest();
    myReposRequest.open("GET", `https://api.github.com/users/${githubUser}/repos`);
    myReposRequest.send();
    
    myReposRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let myRepos = JSON.parse(this.responseText);
        
        for (let i = 0; i < myRepos.length; i++) {
          const div = document.createElement("div");
          const repoName = document.createTextNode(`${myRepos[i].name}`);
          div.style.cssText = `
            margin: 0 0 5px;
            padding: 10px;
            background-color: #000;
            color: #ddd;
            border: 1px solid #444;
            border-radius: 10px;
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `;

          const repoLink = document.createElement("a");
          repoLink.href = `${myRepos[i].html_url}`;
          repoLink.innerHTML = "Repo's Link";
          repoLink.target = "_blank"
          repoLink.style.cssText = `
            padding: 5px;
            background-color: #fff;
            color: #000;
            text-decoration: none;
            border: none;
            border-radius: 10px;
            margin-left: 10px;
            transition: .3s;
            cursor: pointer;
          `;
          
          div.appendChild(repoName);
          div.appendChild(repoLink);
          document.body.appendChild(div);
        }
      }
    }
  }
});