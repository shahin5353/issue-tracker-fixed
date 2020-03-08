document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  if(description =="" || severity == "" || assignedTo == ""){
    window.alert("Input fields must not be empty.")
  }else{
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => +issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => +issue.id !== id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  if(issues.length > 0){
    const openIssues = issues.filter(issue => issue.status !== 'Closed');
    document.getElementById('openIssues').innerText = openIssues.length;
    document.getElementById('allIssues').innerText = `(${issues.length})`;
  }else{
    document.getElementById('openIssues').innerText = "";
    document.getElementById('allIssues').innerText = "";
  }
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    var statusDesc = `<h3 id="status"> ${description} </h3>`
    if(status === 'Closed'){
      var statusDesc = `<h3 id="status"><strike> ${description} </strike></h3>`
    }
        issuesList.innerHTML +=   `<div class="well">
                                  <h6>Issue ID: ${id} </h6>
                                  <p><span class="label label-info"> ${status} </span></p>
                                  ${statusDesc}
                                  <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                  <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                  <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                                  <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                  </div>`;                     
                              
  }
}

