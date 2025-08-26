#!/usr/bin/env node
import fs from 'fs';

const msgPath =
  process.env.HUSKY_GIT_PARAMS || process.argv[2] || '.git/COMMIT_EDITMSG';
const message = fs.readFileSync(msgPath, 'utf-8').trim();

const issuePattern = /#\d+/;

if (!issuePattern.test(message)) {
  console.error(
    '\n❌ 커밋 메시지에 이슈 번호가 없습니다.\n예: feat: 기능 추가 (#12)\n',
  );
  process.exit(1);
}
