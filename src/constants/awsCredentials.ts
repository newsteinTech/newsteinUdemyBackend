export class AWScredentials{
    public static key : string = "AKIARYYVUKFIPUTTAYBN";
    public static pass : string = "n5IdIWf7W8Rek0SRG1oK71eDnT4ovY/J0LtokarS";
    public static bucketName : string = "udemy-videos-and-images";

    public static urlName(fileName : string){
        return "https://udemy-videos-and-images.s3.ap-south-1.amazonaws.com/"+fileName;
    }
}