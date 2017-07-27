#!/usr/bin/env bash

if [ "$1" = "gogs" ]; then

curl -X POST http://localhost:3000 -H "X-Gogs-Event: push" -H "Content-Type: application/json" -d @- << GOGS
{
    "ref": "refs/heads/develop",
    "before": "28e1879d029cb852e4844d9c718537df08844e03",
    "after": "bffeb74224043ba2feb48d137756c8a9331c449a",
    "compare_url": "http://localhost:3000/unknwon/webhooks/compare/28e1879d029cb852e4844d9c718537df08844e03...bffeb74224043ba2feb48d137756c8a9331c449a",
    "commits": [
    {
        "id": "bffeb74224043ba2feb48d137756c8a9331c449a",
        "message": "!@#0^%\u003e\u003e\u003e\u003e\u003c\u003c\u003c\u003c\u003e\u003e\u003e\u003e\n",
        "url": "http://localhost:3000/unknwon/webhooks/commit/bffeb74224043ba2feb48d137756c8a9331c449a",
        "author": {
            "name": "Unknwon",
            "email": "u@gogs.io",
            "username": "unknwon"
        },
        "committer": {
            "name": "Unknwon",
            "email": "u@gogs.io",
            "username": "unknwon"
        },
        "timestamp": "2017-03-13T13:52:11-04:00"
    }
    ],
    "repository": {
        "id": 140,
        "owner": {
            "id": 1,
            "login": "unknwon",
            "full_name": "Unknwon",
            "email": "u@gogs.io",
            "avatar_url": "https://secure.gravatar.com/avatar/d8b2871cdac01b57bbda23716cc03b96",
            "username": "unknwon"
        },
        "name": "webhooks",
        "full_name": "unknwon/webhooks",
        "description": "",
        "private": false,
        "fork": false,
        "html_url": "http://localhost:3000/unknwon/webhooks",
        "ssh_url": "ssh://unknwon@localhost:2222/unknwon/webhooks.git",
        "clone_url": "http://localhost:3000/unknwon/webhooks.git",
        "website": "",
        "stars_count": 0,
        "forks_count": 1,
        "watchers_count": 1,
        "open_issues_count": 7,
        "default_branch": "master",
        "created_at": "2017-02-26T04:29:06-05:00",
        "updated_at": "2017-03-13T13:51:58-04:00"
    },
    "pusher": {
        "id": 1,
        "login": "unknwon",
        "full_name": "Unknwon",
        "email": "u@gogs.io",
        "avatar_url": "https://secure.gravatar.com/avatar/d8b2871cdac01b57bbda23716cc03b96",
        "username": "unknwon"
    },
    "sender": {
        "id": 1,
        "login": "unknwon",
        "full_name": "Unknwon",
        "email": "u@gogs.io",
        "avatar_url": "https://secure.gravatar.com/avatar/d8b2871cdac01b57bbda23716cc03b96",
        "username": "unknwon"
    }
}
GOGS

else

curl -X POST http://localhost:3000 -H "X-Gitlab-Token: test-token" -H "X-Gitlab-Event: Push Hook" -H "Content-Type: application/json" -d @- << GITLAB
{
    "object_kind": "push",
    "before": "2883a17f7a69c35b2a591c63d9581e634d7c3d0e",
    "after": "d5bb5e2fbafb75c37d201de8d0b7f50e2db6b04e",
    "ref": "refs/heads/master",
    "checkout_sha": "d5bb5e2fbafb75c37d201de8d0b7f50e2db6b04e",
    "message": null,
    "user_id": 41,
    "user_name": "王志伟",
    "user_email": "i@hust.cc",
    "project_id": 10,
    "repository": {
        "name": "git-webhook",
        "url": "ssh://git@hust.cc:32200/i/code-mess.git",
        "description": "一些杂碎简单的代码，自己写起来麻烦，搜索也能搜索到，收集起来，提高效率",
        "homepage": "http://hust.cc/i/code-mess",
        "git_http_url": "http://hust.cc/i/code-mess.git",
        "git_ssh_url": "ssh://git@hust.cc:32200/i/code-mess.git",
        "visibility_level": 20
    },
    "commits": [{
        "id": "d5bb5e2fbafb75c37d201de8d0b7f50e2db6b04e",
        "message": "update md",
        "timestamp": "2015-02-13T14:36:08+08:00",
        "url": "http://hust.cc/i/code-mess/commit/d5bb5e2fbafb75c37d201de8d0b7f50e2db6b04e",
        "author": {
            "name": "hustcc",
            "email": "i@hust.cc"
        }
    }, {
        "id": "689ffb6dd35ed9035264ed4155fd4ba8340fcf4d",
        "message": "增加之前做过微信易信公众号开发代码",
        "timestamp": "2015-02-13T14:31:19+08:00",
        "url": "http://hust.cc/i/code-mess/commit/689ffb6dd35ed9035264ed4155fd4ba8340fcf4d",
        "author": {
            "name": "hustcc",
            "email": "i@hust.cc"
        }
    }, {
        "id": "2883a17f7a69c35b2a591c63d9581e634d7c3d0e",
        "message": "加了最近的一些代码，也许大家有用",
        "timestamp": "2015-02-13T13:52:12+08:00",
        "url": "http://hust.cc/i/code-mess/commit/2883a17f7a69c35b2a591c63d9581e634d7c3d0e",
        "author": {
            "name": "hustcc",
            "email": "i@hust.cc"
        }
    }],
    "total_commits_count": 3
}
GITLAB

fi
