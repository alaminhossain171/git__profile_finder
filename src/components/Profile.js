import '../App.css'
import React,{useState} from 'react'

import {Image} from 'react-bootstrap'


const Profile = () => {
    const [userName, setUserName] = useState("");
    const [data, setData] = useState({});
    const [repo, setRepo] = useState([]);

    function handleChange(e) {
        setUserName(e.target.value);
      }
      const handleClick = async (e) => {
        e.preventDefault();
        const profile = await fetch(`https://api.github.com/users/${userName}`);
        const profileJson = await profile.json();
        // console.log(profileJson);
    
        const repo = await fetch(profileJson.repos_url);
        const repoJson = await repo.json();
        console.log(repoJson);
        if (profileJson) {
          if(userName){}
          setData(profileJson);
          setRepo(repoJson);
          setUserName('');
        }
      };

    return (
        <>

<header className="container mt-5 text-center">
<div className="row">
<div className="col-12">
<Image src="img/git.png" height="100"></Image>
<h3 className="mt-3">Github Profile Finder!</h3>
<p className="text-muted">Git Profile finder is a project build with ReactJs, Which uses github API to search Profiles by ther UserName</p>
</div>

</div>

</header>
<section>

<div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <form className="form"><input   type="text"    name={userName}  value={userName}
        onChange={handleChange} className="form-control form-input" placeholder="Enter Github User Name" required/>
            
            <div className="text-center mt-3">

              <button type="submit" onClick={handleClick} className="btn px-5 btn-primary">Search</button>
            </div>
             </form>
        </div>
    </div>
</div>

</section>




<section className="mt-5 mb-5">
<div className="container ">
<div className="row">
<div className="col-md-4 text-center">
<Image src={data.avatar_url} height="180" className="rounded-circle mb-3" />
<h5> {data.name}</h5>
<h6 className="text-muted">{data.login}</h6>
<span className="text-muted">{data.location}</span>
<div className="text-center">
{data.html_url===undefined?"":
<a className="btn btn-sm px-5 btn-secondary my-2 text-light" href={data.html_url} target="blank">Profile</a>}
</div>

{data.html_url===undefined?"":<div className="my-2">
<i className="fa fa-users mx-2 text-muted" aria-hidden="true"></i>{data.followers} <span className="follow text-muted">followers</span> . {data.following} <span className="text-muted follow">following</span>
</div>
}
</div>


<div className="col-md-8">

{data.public_repos===undefined?"":<div className="my-2 text-center">
<h6>Repositories:{data.public_repos}</h6><hr />
</div>
}

<ul className="text-capitalize scroller">
{repo.map(function(allRepo,index){
return <div className="my-2" id={allRepo.id}><i className="fab fa-github mx-2"></i>
<a href={allRepo.html_url} target="blank">{allRepo.name}</a>
<hr />


</div>

})}



</ul>

</div>


</div>

</div>


</section>


<footer className="bg-secondary text-center p-4">
<span className="mt-3 text-light">Created by Md. Al Amin 😇.</span>
<a className="text-light effect" href="https://github.com/alaminhossain171" target="blank">

<i className="fab fa-github mx-2"></i>

See Git Profile</a>


</footer>





        </>
    )
}

export default Profile
