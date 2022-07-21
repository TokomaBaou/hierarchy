import "./styles.css";

export default function App() {
  const responseData: ResponseData = response.data;
  const resultData: P_DEP_001_Result = responseData.resultData;
  /** 第一階層 */
  const setOrganizationList: C10W1P_OrganizationListType[] = resultData.departmentList.map(
    (dep) => {
      const belong: C10W1P_BelongType[] = [
        {
          belongList: dep.belongList,
          departmentCd: dep.departmentCd,
          departmentName: dep.departmentName
        }
      ];
      const topOrganization: C10W1P_OrganizationListType = {
        departmentCd: dep.departmentCd,
        departmentName: dep.departmentName,
        belongList: createBelongList(belong)
      };
      return topOrganization;
    }
  );

  /** 組織階層形式で返却(1-5階層全て) */
  const createBelongList = (
    departmentList: C10W1P_BelongType[]
  ): C10W1P_BelongType[] => {
    // 返却値
    const rtnOrgList: C10W1P_BelongType[] = [];
    departmentList.forEach((dep) => {
      // プルダウンリストを生成
      rtnOrgList.push({
        departmentCd: dep.departmentCd,
        departmentName: dep.departmentName,
        belongList: dep.belongList
      });
      // 子組織がある場合
      if (dep.belongList.length !== 0) {
        belongHierarchy(dep.belongList, [dep.departmentName], rtnOrgList);
      }
    });
    return rtnOrgList;
  };

  /** 子階層を生成 */
  const belongHierarchy = (
    belongList: C10W1P_BelongType[],
    parent: string[],
    orgList: C10W1P_BelongType[]
  ) => {
    const setOrgList: C10W1P_BelongType[] = orgList;
    belongList.forEach((dep) => {
      // 階層名称を生成
      const setParent = [...parent, dep.departmentName];
      // プルダウンリストを生成
      setOrgList.push({
        departmentCd: dep.departmentCd,
        departmentName: setParent.join(" / "),
        belongList: dep.belongList
      });
      // 子組織がある場合
      if (dep.belongList.length !== 0) {
        //（階層数だけループ処理）
        belongHierarchy(dep.belongList, setParent, setOrgList);
      }
    });
  };

  type User = {
    name: string;
    age: number;
  };
  function getUser(): Promise<User> {
    return new Promise((resolve) => {
      const user: User = {
        name: "太郎",
        age: 10
      };
      resolve(user);
    });
  }
  getUser().then((user: User) => {
    console.log(user);
    // @log: { "name": "太郎", "age": 10 }
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
