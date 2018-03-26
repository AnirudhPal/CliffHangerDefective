# Description: TODO

# Import Standard Libs
import socket       # Used for Socket Programming
import sys          # Used to get Command Line Arguments
import threading    # Used for Thread Pool

# Config Vars
VERBOSE = False     # Controls Print Statements
HOST = ''           # Still don't know waht this does
DPORT = 2200        # Default Port
CLARGS = False       # Force use CL Arquments
RTYPE = "GET"       # Use GET, onlt GET Implemented
QSIZE = 5           # Size of Queue in 1 Thread
TCOUNT = 5          # Count of Threads (including main thread)

# Argument Check
if not len(sys.argv) == 2:
    # Usage
    print("Usage:\npython server.py [server_port]\n")
    print("server_port: Set the port.\n")
    print("All arguments are required.")
    # Exit
    sys.exit()

# Make Socket Object
socketObj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind to Port XXXXX
try:
    if CLARGS:
        socketObj.bind((HOST, int(sys.argv[1])))
    else:
        socketObj.bind((HOST, DPORT))
except socket.error as msg:
    if VERBOSE:
        print(str(msg))

### All Functions

# Handle Errors
def send404(to):
    to.send("HTTP/1.1 404 Not Found\r\n\r\n")
def send400(to):
    to.send("HTTP/1.1 400 Bad Request\r\n\r\n")

# Send HTTP
def sendHTTP(to, fd, filename):
    # Null Handler
    if to is None or fd is None or not filename:
        # Error
        send404(to)
        if VERBOSE:
            print("parseHTTP(): Not Real Path\n")
        return

    # Find Content Type
    contentType = "text/plain"
    if filename.endswith(".html"):
        contentType = "text/html"
    elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
        contentType = "image/jpeg"
    elif filename.endswith(".png"):
        contentType = "image/png"
    elif filename.endswith(".js"):
        contentType = "application/javascript"
    elif filename.endswith(".stl"):
        contentType = "application/vnd.ms-pki.stl"
    if VERBOSE:
        print("Content Type: " + contentType + '\n')

    ## Send Response
    # Send Header
    if VERBOSE:
        print("Sending File")
    response = "HTTP/1.1 200 Document follows\r\nServer: Xinu Lab\r\nContent-Type: " + contentType + "\r\n\r\n"
    to.send(response)

    # Split Up Data and Send
    buf = fd.read(1024)
    while buf:
        to.send(buf)
        buf = fd.read(1024)
    if VERBOSE:
        print("File Sent")

# Process HTTP Request
def parseHTTP(client):
    # Max Size (To Limit Size of Recieved Request)
    clientResponse = client.recv(1024)
    clientResponseDecoded = clientResponse

    # Print Response
    if VERBOSE:
        print("Client Data\n" + clientResponseDecoded + '\n')

    ## Get Path
    # Split Lines
    if VERBOSE:
        print("Data Lines and Words")
    i = 0;
    j = 0;
    path = ""
    for line in clientResponseDecoded.split('\n'):
        # Print Lines
        if VERBOSE:
            print("Line " + str(i) + ": " + line)
        i += 1

        # Split Words
        getBucket = False
        for word in line.split(' '):
            # Print Words
            if VERBOSE:
                print("Word " + str(j) + ": " + word)
            j += 1

            # Use Get Bucket
            if getBucket:
                path = word
                if VERBOSE:
                    print("Bucket Caught: " + path + '\n')
                break

            # Set Get Bucket
            if word == RTYPE:
                if VERBOSE:
                    print("Hit a GET\n")
                getBucket = True

        # Why Work Harder
        if path:
            break

    ## Process Path
    # Found Path
    if path:
        # Get Filename
        if path == '/':
            path = "index.html"
        else:
            path =  path[1:]
        if VERBOSE:
            print("Filename: " + path + '\n')

    # No Path
    else:
        # Error
        send400(client)
        if VERBOSE:
            print("parseHTTP(): No Path\n")
        return

    ## Process Filename
    try:
        file = open(path, "rb")
        sendHTTP(client, file, path)
        file.close()
    except:
        # Error
        send404(client)
        if VERBOSE:
            print("parseHTTP(): Not Real Path\n")
        return

# Connection Handler
def worker():
    # Repeat for Ever
    while True:
        # Accept Connection
        conn, addr = socketObj.accept()
        if VERBOSE:
            print("Client Connection\nIP: " + str(addr[0]) + "\nPort: " + str(addr[1]) + '\n')

        # Process Request
        parseHTTP(conn)
	conn.close()

# Listen for Connection
socketObj.listen(QSIZE)

## Create Thread Pool
threads = []
for i in range(TCOUNT - 1):
    # Associate Worker
    t = threading.Thread(target=worker)
    threads.append(t)

    # Kill if main killed
    t.daemon = True

    # Start
    t.start()

# Start
worker()
