#!/usr/bin/python3

import urllib.request
from datetime import datetime  
import os
from script_email import SendMessage


# * * * * * cd ~/.scripts && ./crcns.sh >/tmp/stdout.log 2>/tmp/stderr.log

#set up
main_link = "https://nivlab-geha-01.princeton.edu/home"
# dev_link = "https://nivlab-rldm-01.princeton.edu/home"
# sanity_link = "https://nivlab-geha-02.princeton.edu/home"

log_file = "/Users/gilikarni/Documents/code/CRCRNS-geha/health_script/log.txt"

to = "gili@princeton.edu"
sender = "nivlab.nivturk@gmail.com"

# * * * * * /Users/gilikarni/opt/anaconda3/bin/python  /Users/gilikarni/Documents/code/CRCRNS-geha/health_script/script.py  /Users/gilikarni/Documents/code/CRCRNS-geha/health_script/cronlog.log

def main():

    #get time
    now_time =  datetime.now().timestamp()

    touch_time = os.path.getmtime(log_file)
    diff_time = now_time - touch_time
    one_day_time = 86400 #

    if diff_time>one_day_time:

        
        try:
            # wget
            main_link_request = urllib.request.urlopen(main_link)
            # dev_link_request = urllib.request.urlopen(dev_link)
            # sanity_link_request = urllib.request.urlopen(sanity_link)

            main_code = main_link_request.getcode()
            # print(dev_link_request.getcode())
            # print(sanity_link_request.getcode())

            #timestamp
            date_time = datetime.fromtimestamp(now_time)
            log_time = date_time.strftime("%d-%m-%Y %H:%M:%S")

            #write to log
            loggin_text = "time: {} main_status:{} dev_status:{} sanity_status:{}".format(log_time, main_code, 'tbd', 'tbd')
            f = open(log_file, "a")
            f.write(loggin_text + "\n")
            f.close()
            
            #send email
            if main_code!=200:
                subject = "ERR geha health monitoring: {}".format(main_code)

                msgHtml = loggin_text
                msgPlain = loggin_text

                SendMessage(sender, to, subject, msgHtml, msgPlain)

        except urllib.error.HTTPError as err:

            subject = "ERR geha health monitoring: ERR"

            msgHtml = str(err)
            msgPlain = str(err)

            SendMessage(sender, to, subject, msgHtml, msgPlain)

if __name__ == '__main__':

    main()