import { ReactNode, useRef } from "react";
import "./App.css";
import { ExportPdf } from "./util/getPdf";

function generPaper(layoutStr: string, json: string): JSX.Element[] {
  const Com: JSX.Element[] = [];
  const parseData: [string, string][] = Object.entries(JSON.parse(json));
  const layoutArr = [];
  let temp: string = "";
  for (let i = 0; i < layoutStr.length; i++) {
    const str = layoutStr[i];
    if (str === "-") {
      layoutArr.push(str);
    } else if (str === "]") {
      layoutArr.push(temp);
      temp = "";
    } else if (str !== "[") {
      temp += str;
    }
  }
  //console.log(layoutArr, "yts");
  let i = 0;
  let j = 0;
  while (i < parseData.length) {
    if (layoutArr[j] === "-") {
      Com.push(
        <div
          className={i === 0 ? "divStyle" : ""}
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "10px",
            padding: "10px",
            background: i === 0 ? "#F1F3F4" : "white",
          }}
        >
          <div style={{ flex: 2 }}>{parseData[i][0]}:</div>
          <div style={{ flex: 9 }}>{parseData[i][1]}</div>
        </div>
      );
      i++;
      j++;
    } else {
      // console.log(layoutArr[j], j, "uuu", layoutArr);
      const flexArr = layoutArr[j].split("|");

      Com.push(
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "10px",
            padding: "10px",
          }}
        >
          {flexArr.map((it, index) => {
            if (i + index >= parseData.length) return <></>;
            return (
              <div style={{ flex: it, display: "flex" }} key={index}>
                <div style={{}}>{parseData[i + index][0]}:</div>
                <div style={{}}>{parseData[i + index][1]}</div>
              </div>
            );
          })}
        </div>
      );
      i += flexArr.length;
      j++;
    }
  }
  return Com;
}
function App() {
  const layoutStr = "-[1|1|1|1]-----";
  const json = `{
                  "名字": "杨涛森", 
                  "邮箱": "1283374626@qq.com", 
                  "性别": "男", 
                  "电话":"19823564382", 
                  "求职意向":"前端开发工程师", 
                  "个人优势":"愿意不断学习新技术，拥抱变化并且追求进步，个⼈⽹站（React+Motion.js）：www.yutousi.top善于⾃我总结反思，拥有⾃⼰的博客，有坚持写博客的习惯（yutousi.top内可访问）有两段真实的实习经历，完整参与企业级别的项⽬。",
                  "专业技能":"熟悉前端基本知识，熟悉ES6语法（块级作⽤域，箭头函数等），了解js基本概念熟悉地使⽤React技术栈，使⽤hooks搭建⻚⾯，优化性能。熟悉前端模块化⼯程化，能够简单地使⽤Webpack打包⼯具, git版本控制⼯具。了解typescript的基本使⽤，能够规范开发代码掌握基本的数据结构和算法。对rust感兴趣，并有⼀定的实践。",
                  "实习经历1": "深圳市⾜下科技有限公司（前端开发实习⽣） 2023.07-2023.10 Air⸺⾯向智驾应⽤开发的PC端⼯具链  项⽬介绍  Air 是⾜下科技⾃主研发的 PC 端⼯具链，包含 Air.ZStudio 集成开发环境、Air.ZHealth 系统监控⼯具。  ⽀持ZHealth产品迭代（Tauri+React+Rust）  1.参与超⻓虚拟列表组件的开发，优化⾼频刷新的log数据列表的渲染  2.对zhealth交互和性能持续优化，定位并解决内存泄漏问题  3.独⽴完成Task任务板块的实时数据的可视化⼯作  参与zStudio产品开发（React+vscode+Webassembly+Rust插件开发）  1.使⽤Rust编写msg⽂件结构解析程序，转化为抽象层供其它模块使⽤  2.独⽴完成msg⽂件⽣成treeview的web集成⼯作  3.重构原有的Rust代码⽀持编译为wasm跨平台使⽤  其他⼯作  参与部⻔CI/CD建设，配置Docker镜像，编写单元测试，打包脚本。",
                  "实习经历2": "重庆已成科技有限公司（前端开发实习⽣） 2023.03-2023.06  主要⼯作  完成公司数据中台系统（数据的可视化，数据报表的制作），以及数据中台系统的前端开发，对公司所  有产品进⾏集中管理，通过从0到1封装了⼀个⾃定义菜单的组件，完成公众号菜单栏的统⼀配置。",
                  "教育经历": "重庆科技学院 本科 软件⼯程 2020-2024 1.在⼤⼆学年获得2022中国⼤学⽣计算机设计⼤赛重庆市三等奖，全国⻘年科普创新暨作品⼤赛复赛三 等奖。 2.在⼤⼆学年获得2022年“中国⾼校计算机⼤赛⼀团体程序设计天梯赛”团队三等奖 3.在⼤三上学年获得国家励志奖学⾦，⼆等创新奖学⾦，三等创新奖学⾦，获得三好学⽣，优秀学⽣⼲ 部等多个荣誉称号。 "
                }`;

  const Com = generPaper(layoutStr, json);
  const ref1 = useRef(null);
  const refs = [ref1];
  return (
    <>
      <div style={{ overflow: "visible" }} ref={ref1}>
        {Com?.map((item: ReactNode) => {
          return <>{item}</>;
        })}
      </div>
      <button
        onClick={() => {
          ExportPdf(refs, "简历");
        }}
      >
        导出简历
      </button>
    </>
  );
}

export default App;
