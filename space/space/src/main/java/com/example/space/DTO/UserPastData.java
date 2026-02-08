package com.example.space.DTO;


public class UserPastData {
    private String url;
    private int malicious;
    private int suspicious;
    private int safe;

    public UserPastData() {
    }

    public UserPastData(String url, int malicious, int suspicious, int safe) {
        this.url = url;
        this.malicious = malicious;
        this.suspicious = suspicious;
        this.safe = safe;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getMalicious() {
        return malicious;
    }

    public void setMalicious(int malicious) {
        this.malicious = malicious;
    }

    public int getSuspicious() {
        return suspicious;
    }

    public void setSuspicious(int suspicious) {
        this.suspicious = suspicious;
    }

    public int getSafe() {
        return safe;
    }

    public void setSafe(int safe) {
        this.safe = safe;
    }
}
