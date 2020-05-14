import React from "react";

class HealthNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "", newsbuletin: [] };
  }

  componentDidMount() {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=in&apiKey=0ca7c9b75f60463bb1dfc1ee983777ff"
    )
      .then((newsjson) => {
        return newsjson.json();
      })
      .then((data) => {
        let newsbuletin = (
          <marquee
            width="100%"
            direction="up"
            height="250"
            scrolldelay="150"
            behavior="scrolling"
          >
            {data.articles.map((newsarticle) => {
              return (
                <p>
                  <a
                    href={newsarticle.url}
                    target="_blank"
                    title={newsarticle.source.name}
                  >
                    {newsarticle.title}
                  </a>
                </p>
              );
            })}
          </marquee>
        );

        this.setState({ newsbuletin: newsbuletin });
      });
  }

  render() {
    return <div>{this.state.newsbuletin}</div>;
  }
}

export default HealthNews;
