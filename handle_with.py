#!/usr/bin/env python3

import sys

arg1 = sys.argv[1]

spl_word = '://'

parts = arg1.partition('://')

action = parts[0]
href = parts[2]

with open("/tmp/handle_with.log", "a") as log:
    log.write('action=' + action + ', href=' + href + '\n')
