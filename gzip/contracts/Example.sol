pragma solidity >=0.4.21 <0.6.0;

contract Example {
  event ArticleAddedInTransaction();
  event ArticleAddedInArray(uint id);
  event ArticleAddedInEvent(string content);

  string[] public articleArray;

  function inTransaction() external {
    emit ArticleAddedInTransaction();
  }

  function inArray(string calldata content) external  {
    articleArray.push(content);
    emit ArticleAddedInArray(articleArray.length);
  }

  function inEvent(string calldata content) external {
    emit ArticleAddedInEvent(content);
  }
}
