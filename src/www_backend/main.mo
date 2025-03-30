import List "mo:base/List";
import Blob "mo:base/Blob";
import Text "mo:base/Text";

actor Backend {
    private stable var activityList: List.List<(Text,Text)> = List.nil();
    private stable var placeList: List.List<(Text,Text)> = List.nil();
    private stable var timeList : List.List<(Text,Text)> = List.nil();

    public shared ({ caller }) func addActivity(name: Text, image: Text) : async () {
        activityList := List.push<(Text, Text)>((name, image), activityList);
    };

    public shared ({ caller }) func addPlace(name: Text, image: Text) : async () {
        placeList := List.push<(Text, Text)>((name, image), placeList);
    };

    public shared ({ caller }) func addTime(name: Text, image: Text) : async () {
        timeList := List.push<(Text, Text)>((name, image), timeList);
    };

    public query func getActivities() : async [(Text, Text)] {
        List.toArray(activityList);
    };

    public query func getPlaces() : async [(Text, Text)] {
        List.toArray(placeList);
    };

    public query func getTimes() : async [(Text, Text)] {
        List.toArray(timeList);
    };

    public query func deleteAll() : async () {
        activityList := List.nil();
        placeList := List.nil();
        timeList := List.nil();
    }
}
