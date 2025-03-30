import List "mo:base/List";
import Blob "mo:base/Blob";
import Text "mo:base/Text";

actor Backend {
    private stable var activityList = List.nil<(Text, Blob)>();
    private stable var placeList = List.nil<(Text, Blob)>();
    private stable var timeList = List.nil<(Text, Blob)>();

    public shared ({ caller }) func addActivity(name: Text, image: Blob) : async () {
        activityList := List.push<(Text, Blob)>((name, image), activityList);
    };

    public shared ({ caller }) func addPlace(name: Text, image: Blob) : async () {
        placeList := List.push<(Text, Blob)>((name, image), placeList);
    };

    public shared ({ caller }) func addTime(name: Text, image: Blob) : async () {
        timeList := List.push<(Text, Blob)>((name, image), timeList);
    };

    public query func getActivities() : async List.List<(Text, Blob)> {
        activityList;
    };

    public query func getPlaces() : async List.List<(Text, Blob)> {
        placeList;
    };

    public query func getTimes() : async List.List<(Text, Blob)> {
        timeList;
    };
}
