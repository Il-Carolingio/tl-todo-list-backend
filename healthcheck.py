from http.server import BaseHTTPRequestHandler, HTTPServer

class HealthCheckHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'MySQL Container is Healthy')

def run():
    server_address = ('0.0.0.0', 8006)
    httpd = HTTPServer(server_address, HealthCheckHandler)
    print('Health check server running on port 8080...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()