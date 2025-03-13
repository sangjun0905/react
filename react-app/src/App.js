import logo from './logo.svg';
import './App.css';

function Header(props){ //사용자 정의 태그(대문자 네이밍) 컴포넌트 
  console.log("props", props.title);
  return <header><h1><a href="/"onClick={function(event){
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1></header>
}

function Article(props){
  return <article>
    <h2>{props. title}{props.body}</h2>
    
  </article>
}

function Nav(props){
  const lis = []
    
  for(let i=0;i<props.topics.length;i++){
  let t = props.topics[i];
  lis.push(<li key={t.id}>
    <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(event.target.id);
    }}>{t.title}</a>
    </li>)
}

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function App() {
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]
  
  return (
    <div className="App">
      <Header title = "React" onChangeMode={function(){
        alert('Header');
      }}></Header> 

      <header className="App-header">
        <Article title = "Welcome " body="hello, web"></Article>
      </header>
      <Nav topics={topics} onChangeMode={function(id){
        alert(id);
      }}></Nav>
    </div>
  );
}

export default App;
