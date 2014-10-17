490 Server
=============

To set this up, do the following:

1. Install node.js
2. Run ```sudo npm install express node-dev require --save``` to install
   dependencies.
3. Run ```node-dev index.js``` to start the server. node-dev will restart the
   server any time changes to a file in the folder are saved.
4. Access from localhost:3000 in your browser.

Current Routes
================

```/ask?question="what is watson?"``` Asks Watson a question. Currently polls
Watson a bunch to get updated responses and logs them out.

TODO
=======

[] Update to use sockets so response from Watson can be emitted to client.
[] Endpoint for querying specific case/judge/topic.
